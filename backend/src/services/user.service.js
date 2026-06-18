import prisma from "../db/prismaClient";

/*
data {
    role(ADMIN, PHARMACIST),
    username(unique),
    email(unique),
    password(hashed)
}
*/
async function createUser(data) {
    try {
        const newUser = await prisma.User.create({
            data: data
        });
        return newUser;
    } catch (error) {
        console.log('Unable to create User with the provided data: ', error);
        throw error;
    }
}

// The updatedData has the id of the user to be updated and the updated version of its data
async function updateUser(updatedData) {
    try {
        await prisma.User.update({
            where: {id: updatedData.id},
            data: updatedData
        });
    } catch (error) {
        console.log('Unable to update User with the provided data: ', error);
        throw error;
    }
}

async function findUserById(id) {
    try {
        const user = await prisma.User.findUnique({
            where: {
                id: id
            }
        });
        return user;
    } catch (error) {
        console.log('Unable to find User by the provided ID: ', error);
        throw error;
        return null; // User not found
    }
}

async function findUserByEmail(email) {
    try {
        const user = await prisma.User.findUnique({
            where: {
                email: email
            }
        });
        return user;
    } catch (error) {
        console.log('Unable to find User by the provided Email: ', error);
        throw error;
        return null; // User not found
    }
}

async function findUserByUsername(username) {
    try {
        const user = await prisma.User.findUnique({
            where: {
                username: username
            }
        });
        return user;
    } catch (error) {
        console.log('Unable to find User by the provided Username: ', error);
        throw error;
        return null; // User not found
    }
}

async function getAllUsers() {
    try {
        const users = await prisma.User.findMany();
        return users;
    } catch (error) {
        console.log('Unable to find any users: ', error);
        throw error;
        return []; // No user found, return empty list
    }
}

export {
    createUser,
    updateUser,
    findUserById,
    findUserByEmail,
    findUserByUsername,
    getAllUsers,
};

