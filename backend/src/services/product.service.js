import prisma from "../db/prismaClient";

/*
data {
    id            String @id @default(uuid())
    name          String @unique
    sellingPrice  Decimal
    
    catId         String?
    cat?          connect: { id: customerId } : undefined
}
*/
async function createProduct(data) {
    try {
        const product = await prisma.Product.create({
            data: data
        });
        return product;
    } catch (error) {
        console.log('Unable to create Product with the provided data: ', error);
        throw error;
    }
}

// The updatedData has the id of the Product to be updated and the updated version of its data
async function updateProduct(updatedData) {
    try {
        await prisma.Product.update({
            where: {id: updatedData.id},
            data: updatedData
        });
    } catch (error) {
        console.log('Unable to update Product with the provided data: ', error);
        throw error;
    }
}

// filters has the searching criteria, 
// it can have any of the following attributes or none at all: {
//  id: string, name: string, sellingPrice: decimal, catId: string,
//  page: int, limit: int
// }
async function findProducts(filters = {}) {
    try {
        const {id, name, sellingPrice, catId, page = 1, limit = 50} = filters;

        const whereClause = {}; // The where for prisma searching

        // Build whereClause
        if(id) whereClause.id = id;
        if(name) whereClause.name = name;
        if(sellingPrice !== undefined) whereClause.sellingPrice = sellingPrice;
        if(catId) whereClause.catId = catId;

        // Apply query
        const products = await prisma.Product.findMany({
            where: whereClause,
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit)
        });

        return products;
    } catch (error) {
        console.log('Unable to find Products by the provided filters: ', error);
        throw error;
        return []; // Products not found
    }
}

export {
    createProduct,
    updateProduct,
    findProduct
};

