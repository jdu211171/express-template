import express from 'express';
import UsersRepository from '../models/user.repository';
import {createToken} from "../config/Token";
import {createUniqueUsername} from "../config/Username";

const router = express.Router();
router.post('/create', async (req, res) => {
    try {
        const username = createUniqueUsername(Date.now());
        const user = await UsersRepository.createUser({username});
        const token = createToken(user.username, user.id);
        return res.status(200).json({user, token}).end();
    } catch (error: any) {
        return res.status(500).json({message: error.message}).end();
    }
});

export default router;
