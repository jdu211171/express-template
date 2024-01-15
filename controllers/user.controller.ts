import express from 'express';
import UsersRepository from '../models/user.repository';
import {uniqueUsernameGenerator} from "unique-username-generator";
import {config} from "../config/UsernameConfig";
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/create', async (req, res) => {
    try {
        let username: string;
        let unique: boolean;
        do {
            username = uniqueUsernameGenerator(config);
            unique = await isUnique(username);
        } while(!unique);
        const user = await UsersRepository.createUser({username});
        res.status(200).json(user).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

async function isUnique(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    })
    return user == null;
}

export default router;