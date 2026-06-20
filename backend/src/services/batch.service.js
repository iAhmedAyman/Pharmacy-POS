import prisma from "../db/prismaClient";

/*
data {
    id            String @id @default(uuid())
    purchasePrice Decimal
    quantity      Int
    expireDate    DateTime

    productId     String
    product       Product @relation(fields: [productId], references: [id])  
}
*/
async function createBatch(data) {
    try {
        await prisma.Batch.create({
            data: data
        });
    } catch (error) {
        console.log('Unable to create Batch with the provided data: ', error);
        throw error;
    }
}

// The updatedData has the id of the Product to be updated and the updated version of its data
async function updateBatch(updatedData) {
    try {
        await prisma.Batch.update({
            where: {id: updatedData.id},
            data: updatedData
        });
    } catch (error) {
        console.log('Unable to update Batch with the provided data: ', error);
        throw error;
    }
}

// filters has the searching criteria, 
// it can have any of the following attributes or none at all: {
//  id: string, purchasePrice: decimal, minQuantity: int, minExpireDate: DateTime, productId: string,
//  page: int, limit: int
// }
async function findBatches(filters = {}) {
    try {
        const {id, purchasePrice, minQuantity, minExpireDate, productId, page = 1, limit = 50} = filters;

        const whereClause = {}; // The where for prisma searching

        // Build whereClause
        if(id) whereClause.id = id;
        if(purchasePrice !== undefined) whereClause.purchasePrice = purchasePrice;
        if(minQuantity !== undefined) whereClause.quantity = {gte: minQuantity};
        if(minExpireDate) whereClause.expireDate = {gt: minExpireDate};
        if(productId) whereClause.productId = productId;

        // Apply query
        const batches = await prisma.Batch.findMany({
            where: whereClause,
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit),
            orderBy: {
                expireDate: 'asc' // FEFO
            }
        });

        return batches;
    } catch (error) {
        console.log('Unable to find Batches by the provided filters: ', error);
        throw error;
        return []; // Batches not found
    }
}

export {
    createBatch,
    updateBatch,
    findBatch
};

