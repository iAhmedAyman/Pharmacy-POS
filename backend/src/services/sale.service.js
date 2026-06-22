import prisma from "../db/prismaClient.js";
import * as batchService from './batch.service.js';
import * as productService from "./product.service.js";
import calculateTotal from "../utils/calculateTotals.js";

async function chooseBatches(productId, quantity, minExpireDate = undefined) {
    try {
        const returnList = [];
        let quantityFound = 0;
        let page = 1;

        while(quantityFound < quantity) {
            const filters = {
                minQuantity: 1,
                minExpireDate,
                productId,
                page,
                limit: 10
            }

            // Get batches from the database
            const batches = await batchService.search(filters);

            if(batches.length == 0) break;

            for(const batch of batches) {
                returnList.push(batch);
                quantityFound += batch.quantity;
                if(quantityFound >= quantity) return returnList;
            }
            page++;
        }
        return returnList;
    } catch (error) {
        console.log('Unable to find batches for this product: ', error);
        throw error;
    }
}

// a product has the productId and the quantity to be sold and an optional minimum expiration date
// product -> { productId, quantity, minExpireDate = undefined }
// products is an array of product
async function getAllBatches(products) {
    try {
        const allBatches = []; // array of arrays of batches, an array for each product
        for(const product of products) {
            const { productId, quantity, minExpireDate = undefined } = product;

            // Select batches to sell from for this product
            const batches = await chooseBatches(productId, quantity, minExpireDate);

            allBatches.push(batches); // Add batches for the current product to the allBatches array
        }
        return allBatches;
    } catch (error) {
        console.log('Uexpected error happend while getting batches for a products list: ', error);
        throw error;
    }
}

async function createSaleItemObject(items, allBatches) {
    try {
        // saleItem -> { quantity, unitPrice, batchId } (saleId gets linked on creation later)
        const saleItems = [];
        for(let i = 0; i < items.length; i++) {
            const { productId, quantity } = items[i];
            let quantityCounter = 0;

            const batches = allBatches[i];
            if(batches.length === 0) continue;

            // Get the price of the product of the current list of batches
            const product = await productService.search({searchId: batches[0].productId}, {selectSellingPrice: true});
            const price = product.length > 0 ? product[0].sellingPrice : undefined;
            if(price == undefined) continue; // product now found

            // Create a saleItem for each batch
            for(const batch of batches) {
                // How much to take from current batch
                const takenQuantity = Math.min(quantity - quantityCounter, batch.quantity);
                const saleItem = {
                    quantity: takenQuantity,
                    unitPrice: price,
                    batchId: batch.id,
                }

                // Update the current batch
                batch.quantity -= takenQuantity;

                // Add saleItem to the list
                saleItems.push(saleItem);
                // Update counter
                quantityCounter += takenQuantity;
                if(quantityCounter === quantity) break; // No more saleItems needed
            }
        }
        return saleItems;
    } catch (error) {
        console.log('Uexpected error happend while creating sale items: ', error);
        throw error;
    }
}

/*
data {
    subTotal      Decimal
    discountRate  Decimal
    taxRate       Decimal
    totalAmount   Decimal
    createdAt     DateTime @default(now())

    user          connect: {id: userId}
    customerId?   connect: { id: customerId } : undefined
}
*/
async function create(data) {
    try {
        const {
            discountRate,
            taxRate,
            userId,
            customerId = undefined,
            items       // items -> [{ productId, quantity, minExpireDate = undefined }]
        } = data;

        const allBatches = await getAllBatches(items);
        const saleItems = await createSaleItemObject(items, allBatches);

        const {totalAmount, subTotal} = calculateTotal(saleItems, discountRate, taxRate);

        const dataClause = {
            subTotal,
            discountRate,
            taxRate,
            totalAmount,
            userId,
            
            // Create saleItems and link them to the current sale
            saleItems: {
                create: saleItems.map(item => ({
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    batch: { connect: { id: item.batchId } }
                }))
            }
        };
        // Optional customerId
        if(customerId) dataClause.customerId = customerId;

        const saleCreationInstruction = prisma.Sale.create({
            data: dataClause,
            include: {
                saleItems: true
            }
        });

        // Get batches update instructions
        const instructions = await batchService.updateAllBatches(allBatches);
        instructions.unshift(saleCreationInstruction);

        // Execute all instructions at once
        const [sale] = await prisma.$transaction(instructions);

        return sale;
    } catch (error) {
        console.log('Unable to create Sale with the provided data: ', error);
        throw error;
    }
}

// The updatedData has the id of the Sale to be updated and the updated version of its data
async function update(updatedData) {
    try {
        return await prisma.Sale.update({
            where: {id: updatedData.id},
            data: updatedData
        });
    } catch (error) {
        console.log('Unable to update Sale with the provided data: ', error);
        throw error;
    }
}

// filters has the searching criteria, 
// it can have any of the following attributes or none at all: {
//  id, createdBefore, createdAfter, totalLessThan, totalMoreThan, userId, customerId
//  page, limit
// }
async function search(filters = {}) {
    try {
        const {
            id, createdBefore, createdAfter, totalLessThan, 
            totalMoreThan, userId, customerId, page = 1, limit = 50
        } = filters;

        const whereClause = {}; // The where for prisma searching

        // Build whereClause
        if(id) whereClause.id = id;
        if(createdBefore) whereClause.createdAt = {lte: createdBefore};
        if(createdAfter) whereClause.createdAt = {gte: createdAfter};
        if(totalLessThan !== undefined) whereClause.totalAmount = {lte: totalLessThan};
        if(totalMoreThan !== undefined) whereClause.totalAmount = {gte: totalMoreThan};
        if(userId) whereClause.userId = userId;
        if(customerId) whereClause.customerId = customerId;

        // Apply query
        const sales = await prisma.Sale.findMany({
            where: whereClause,
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit),
            include: {
                saleItems: true // Return the saleItems with the sale objects
            }
        });

        return sales;
    } catch (error) {
        console.log('Unable to find Sales by the provided filters: ', error);
        throw error;
    }
}

export {
    create,
    update,
    search
};

