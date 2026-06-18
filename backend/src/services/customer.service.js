import prisma from "../db/prismaClient";

/*
data {
    name
    phoneNumber(unique, optional)
    email(unique, optional)
}
*/
async function createCustomer(data) {
    try {
        await prisma.Customer.create({
            data: data
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

async function findCustomerById(id) {
    try {
        const customer = await prisma.Customer.findUnique({
            where: {
                id: id
            }
        });
        return customer;
    } catch (error) {
        console.log('Unable to find Customer by the provided ID: ', error);
        throw error;
        return null; // Customer not found
    }
}

async function findCustomerByEmail(email) {
    try {
        const customer = await prisma.Customer.findUnique({
            where: {
                email: email
            }
        });
        return customer;
    } catch (error) {
        console.log('Unable to find Customer by the provided Email: ', error);
        throw error;
        return null; // Customer not found
    }
}

async function findCustomerByPhoneNumber(phoneNum) {
    try {
        const customer = await prisma.Customer.findUnique({
            where: {
                phoneNumber: phoneNum
            }
        });
        return customer;
    } catch (error) {
        console.log('Unable to find Custe,er by the provided phone number: ', error);
        throw error;
        return null; // customer not found
    }
}

async function getAllCustomers() {
    try {
        const customers = await prisma.Customer.findMany();
        return customers;
    } catch (error) {
        console.log('Unable to find any customers: ', error);
        throw error;
        return []; // No customers found, return empty list
    }
}

export {
    createCustomer,
    updateCustomer,
    findCustomerById,
    findCustomerByPhoneNumber,
    getAllCustomers,
};

