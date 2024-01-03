import {Prisma, PrismaClient, User} from '@prisma/client';

const prisma = new PrismaClient();

class UsersRepository {

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            return await prisma.user.create({
                data,
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async findUserById(id: number): Promise<User | null> {
        try {
            return await prisma.user.findUnique({
                where: {
                    userId: id,
                },
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUserById(id: number, data: Prisma.UserUpdateInput): Promise<User> {
        try {
            return await prisma.user.update({
                where: {
                    userId: id,
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

    async deleteUserById(id: number): Promise<User> {
        try {
            return await prisma.user.delete({
                where: {
                    userId: id,
                },
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new UsersRepository();