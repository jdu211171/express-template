import express from 'express';
import UsersRepository from '../models/user.repository';
import {PrismaClient, User} from '@prisma/client';
import {createToken} from "../config/Token";
import {createUniqueUsername} from "../config/Username";

const router = express.Router();
const prisma = new PrismaClient();

router.post('/create', async (req, res) => {
    try {
        const username = createUniqueUsername(Date.now());
        const user = await UsersRepository.createUser({username});
        const token = createToken(user.username, user.id, user.created_at);
        return res.status(200).json({user, token}).end();
    } catch (error: any) {
        return res.status(500).json({message: error.message}).end();
    }
});

export function userInfo(user_id: number): Promise<User | null> {
    return prisma.user.findUnique({
        where: {
            id: user_id,
        },
    });
}

export default router;
