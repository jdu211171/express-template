import {Prisma, PrismaClient, User} from '@prisma/client';

const prisma = new PrismaClient();

class UsersRepository {

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        try {
            return await prisma.user.create({
                data,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            return await prisma.user.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

export default new UsersRepository();