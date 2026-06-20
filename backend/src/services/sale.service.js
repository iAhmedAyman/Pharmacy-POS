import prisma from "../db/prismaClient";
import { findBatch } from "./batch.service";

async function chooseBatches(productId, quantity, minExpireDate = undefined) {
    const returnList = {
        batches: [],
        quantityFound: 0
    };
    let page = 1;

    while(returnList.quantityFound < quantity) {
        const filters = {
            minQuantity: 1,
            minExpireDate,
            productId,
            page,
            limit: 10
        }

        // Get batches from the database
        const batches = await findBatch(filters);

        if(batches.length == 0) break;

        for(const batch of batches) {
            returnList.batches.push(batch);
            returnList.quantityFound += batch.quantity;
            if(returnList.quantityFound >= quantity) return returnList;
        }
        page++;
    }
}

// a product has the productId and the quantity to be sold and an optional minimum expiration date
// product -> { productId, quantity, minExpireDate = undefined }
// products is an array of product
async function getAllBatches(products) {
    const allBatches = []; // array of arrays of batches, an array for each product
    for(const product of products) {
        const { productId, quantity, minExpireDate = undefined } = product;

        // Select batches to sell from for this product
        const batches = await chooseBatches(productId, quantity, minExpireDate);

        allBatches.push(batches); // Add batches for the current product to the allBatches array
    }
    return allBatches;
}

// saleItem -> { quantity, unitPrice, batchId } (saleId gets linked on creation later)
function createSaleItemObject(items, allBatches) {
    const saleItems = [];
    for(let i = 0; i < items.length; i++) {
        const { productId, quantity } = items[i];
        const batches = allBatches[i];

        // Create a saleItem for each batch
        for(const batch of batches) {
            const saleItem = {
                quantity,
                unitPrice: batch.sel
            }
        }
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
async function createSale(data) {
    try {
        const {
            subTotal,
            discountRate,
            taxRate,
            totalAmount,
            createdAt,
            userId,
            customerId,
            items       // items -> { productId, quantity, minExpireDate = undefined }
        } = data;

        const allBatches = getAllBatches(items);
        await prisma.Sale.create({
            data: data
        });
    } catch (error) {
        console.log('Unable to create Sale with the provided data: ', error);
        throw error;
    }
}

// The updatedData has the id of the Sale to be updated and the updated version of its data
async function updateSale(updatedData) {
    try {
        await prisma.Sale.update({
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
async function findSales(filters = {}) {
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
        if(totalMoreThan !== undefiend) whereClause.totalAmount = {gte: totalMoreThan};
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
        return null; // Sales not found
    }
}

export {
    createSale,
    updateSale,
    findSales
};

