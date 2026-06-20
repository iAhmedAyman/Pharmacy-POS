import prisma from "../db/prismaClient";

/*
data {
    name
    phonenumber(unique, optional)
    email(unique, optional)
}
*/
async function createCustomer(data) {
    try {
        const {name, phonenumber, email} = data;
        await prisma.Customer.create({
            data: {
                name,
                email,
                phonenumber
            }
        });
    } catch (error) {
        console.log('Unable to create Customer with the provided data: ', error);
        throw error;
    }
}

// The updatedData has the id of the Customer to be updated and the updated version of its data
async function updateCustomer(updatedData) {
    try {
        await prisma.Customer.update({
            where: {id: updatedData.id},
            data: updatedData
        });
    } catch (error) {
        console.log('Unable to update Customer with the provided data: ', error);
        throw error;
    }
}

// filters has the searching criteria, 
// it can have any of the following attributes or none at all: {
//  id: string, name: string, email: string, phonenumber: string
//  page: int, limit: int
// }
async function findCustomers(filters = {}) {
    try {
        const {id, name, email, phonenumber, page = 1, limit = 50} = filters;

        const whereClause = {}; // The where for prisma searching

        // Build whereClause
        if(id) whereClause.id = id;
        if(name) whereClause.name = name;
        if(email) whereClause.email = email;
        if(phonenumber) whereClause.phonenumber = phonenumber;

        // Apply query
        const batches = await prisma.Batch.findMany({
            where: whereClause,
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit)
        });

        return batches;
    } catch (error) {
        console.log('Unable to find Batches by the provided filters: ', error);
        throw error;
        return []; // Batches not found
    }
}

export {
    createCustomer,
    updateCustomer,
    findCustomers
};

