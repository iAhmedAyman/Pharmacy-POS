import prisma from "../db/prismaClient";

/*
data {
    id            String @id @default(uuid())
    name          String
    sellingPrice  Decimal
    
    catId         String?
    cat?          connect: { id: customerId } : undefined
}
*/
async function createProduct(data) {
    try {
        await prisma.Product.create({
            data: data
        });
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

async function findProductById(id) {
    try {
        const product = await prisma.Product.findUnique({
            where: {
                id: id
            }
        });
        return product;
    } catch (error) {
        console.log('Unable to find Product by the provided ID: ', error);
        throw error;
        return null; // Product not found
    }
}

async function findProductByName(name) {
    try {
        const product = await prisma.Product.findUnique({
            where: {
                name: name
            }
        });
        return product;
    } catch (error) {
        console.log('Unable to find Product by the provided name: ', error);
        throw error;
        return null; // Product not found
    }
}

async function findProductsByCat(catName) {
    try {
        const products = await prisma.Product.findMany({
            where: {
                cat: {
                    name: catName
                }
            }
        });
        return products;
    } catch (error) {
        console.log('Unable to find Products by the provided category name: ', error);
        throw error;
        return null; // Products not found
    }
}

async function getAllProducts() {
    try {
        const products = await prisma.Product.findMany();
        return products;
    } catch (error) {
        console.log('Unable to find any Products: ', error);
        throw error;
        return []; // No Products found, return empty list
    }
}

export {
    createProduct,
    updateProduct,
    findProductById,
    findProductByName,
    findProductsByCat,
    getAllProducts,
};

