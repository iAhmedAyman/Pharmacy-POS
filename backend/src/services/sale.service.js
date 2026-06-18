import prisma from "../db/prismaClient";

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

async function findSaleById(id) {
    try {
        const sale = await prisma.Sale.findUnique({
            where: {
                id: id
            }
        });
        return sale;
    } catch (error) {
        console.log('Unable to find Sale by the provided ID: ', error);
        throw error;
        return null; // Sale not found
    }
}

async function findSaleByDate(Date) {
    try {
        const sale = await prisma.Sale.findUnique({
            where: {
                createdAt: Date
            }
        });
        return sale;
    } catch (error) {
        console.log('Unable to find Sale by the provided Email: ', error);
        throw error;
        return null; // Sale not found
    }
}

async function findSalesByUserId(userId) {
    try {
        const sales = await prisma.Sale.findMany({
            where: {
                userId: userId
            }
        });
        return sales;
    } catch (error) {
        console.log('Unable to find Sales by the provided UserId: ', error);
        throw error;
        return null; // Sales not found
    }
}

async function findSalesByCustomerId(customerId) {
    try {
        const sales = await prisma.Sale.findMany({
            where: {
                customerId: customerId
            }
        });
        return sales;
    } catch (error) {
        console.log('Unable to find Sales by the provided customerId: ', error);
        throw error;
        return null; // Sales not found
    }
}

async function getAllSales() {
    try {
        const sales = await prisma.Sale.findMany();
        return sales;
    } catch (error) {
        console.log('Unable to find any sales: ', error);
        throw error;
        return []; // No sales found, return empty list
    }
}

export {
    createSale,
    updateSale,
    findSaleById,
    findSaleByDate,
    findSalesByCustomerId,
    findSalesByUserId,
    getAllSales,
};

