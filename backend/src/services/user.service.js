import { use } from "react";
import prisma from "../db/prismaClient";
import { Role } from "../utils/role";

/*
data {
    id            String @id @default(uuid())
    role          Role
    username      String @unique
    email         String @unique
    password      String <- Hashed
}
*/
async function createUser(data) {
    try {
        const {role, username, email, password} = data;
        const newUser = await prisma.User.create({
            data: {
                role,
                username,
                email,
                password
            }
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

// filters has the searching criteria, 
// it can have any of the following attributes or none at all: {
//  id: string, role: ADMIN/PHARMACIST, username: string, email: string
//  page: int, limit: int
// }
async function findUsers(filters = {}) {
    try {
        const {id, role, username, email, page = 1, limit = 50} = filters;

        const whereClause = {}; // The where for prisma searching

        // Build whereClause
        if(id) whereClause.id = id;
        if(role) whereClause.role = role;
        if(username) whereClause.username = username;
        if(email) whereClause.email = email;

        // Apply query
        const users = await prisma.User.findMany({
            where: whereClause,
            take: Number(limit),
            skip: (Number(page) - 1) * Number(limit)
        });

        return users;
    } catch (error) {
        console.log('Unable to find Users by the provided filters: ', error);
        throw error;
        return []; // Users not found
    }
}

export {
    createUser,
    updateUser,
    findUsers
};

