import {Prisma, PrismaClient, user} from '@prisma/client';

const prisma = new PrismaClient();

class UsersRepository {

    async createUser(data: Prisma.userCreateInput): Promise<user> {
        try {
            return await prisma.user.create({
                data,
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findUserById(id: number): Promise<user | null> {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: id,
                },
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUserById(id: number, data: Prisma.userUpdateInput): Promise<user> {
        try {
            return await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    username: data.username,
                },
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUserById(id: number): Promise<user> {
        try {
            return await prisma.user.delete({
                where: {
                    id: id,
                },
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new UsersRepository();