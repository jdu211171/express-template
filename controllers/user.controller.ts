import express from 'express';
import UsersRepository from '../models/user.repository';
import {createToken} from '../config/Token';
import {createUniqueUsername} from '../config/Username';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const username = createUniqueUsername(Date.now());
        const user = await UsersRepository.createUser({username});
        return res.status(200).json({
            id: user.insertId,
            username,
            token: createToken(username, user.insertId)
        }).end();
    } catch (error: any) {
        return res.status(500).json({message: error.message}).end();
    }
});

router.put('/update', async (req, res) => {
    try {
        const {id, username} = req.body;
        const user = await UsersRepository.updateUser(id, {username});
        return res.status(200).json({
            id,
            username,
        }).end();
    } catch (error: any) {
        return res.status(500).json({message: error.message}).end();
    }
});

export default router;
