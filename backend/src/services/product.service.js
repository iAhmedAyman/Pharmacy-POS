import prisma from "../db/prismaClient.js";

/*
data {
    id            String @id @default(uuid())
    name          String @unique
    sellingPrice  Decimal
    
    catId         String?
    cat?          connect: { id: customerId } : undefined
}
*/
async function create(data) {
    try {
        const {name, sellingPrice, catId = undefined} = data;
        const dataClause = {
            name,
            sellingPrice
        };
        if(catId) dataClause.catId = catId;
        const product = await prisma.Product.create({
            data: dataClause
        });
        return product;
    } catch (error) {
        console.log('Unable to create Product with the provided data: ', error);
        throw error;
    }
}

// The updatedData has the id of the Product to be updated and the updated version of its data
async function update(updatedData) {
    try {
        const {id, name, sellingPrice, catId = undefined} = updatedData;
        const dataClause = {
            name,
            sellingPrice
        };
        if(catId) dataClause.catId = catId;
        return await prisma.Product.update({
            where: {id: id},
            data: dataClause
        });
    } catch (error) {
        console.log('Unable to update Product with the provided data: ', error);
        throw error;
    }
}

// filters has the searching criteria, 
// it can have any of the following attributes or none at all: {
//  searchId: string, searchName: string, searchSellingPrice: decimal, searchCatId: string,
//  page: int, limit: int
// }
// columns has the columns to be returned: {
//  selectId: bool,
//  selectName: bool,
//  selectSellingPrice: bool,
//  selectCatId: bool,
//  selectCat: bool
//}
async function search(filters = {}, columns = {}) {
    try {
        const {searchId, searchName, searchSellingPrice, searchCatId, page = 1, limit = 50} = filters;

        const whereClause = {}; // The where for prisma searching

        // Build whereClause
        if(searchId) whereClause.id = searchId;
        if(searchName) whereClause.name = searchName;
        if(searchSellingPrice !== undefined) whereClause.sellingPrice = searchSellingPrice;
        if(searchCatId) whereClause.catId = searchCatId;

        const {selectId, selectName, selectSellingPrice, selectCatId, selectCat} = columns;

        const selectClause = {}; // The select for prisma column selection

        // Build selectClause
        if(selectId) selectClause.id = true;
        if(selectName) selectClause.name = true;
        if(selectSellingPrice !== undefined) selectClause.sellingPrice = true;
        if(selectCatId) selectClause.catId = true;
        if(selectCat) selectClause.cat = { select: { id: true, name: true } };

        const query = {
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit),
        }

        if(Object.keys(whereClause).length > 0) query.where = whereClause;
        if(Object.keys(selectClause).length > 0) query.select = selectClause;

        // Apply query
        const products = await prisma.Product.findMany(query);

        return products;
    } catch (error) {
        console.log('Unable to find Products by the provided filters: ', error);
        throw error;
    }
}

export {
    create,
    update,
    search
};

