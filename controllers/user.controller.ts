import express from 'express';
import UsersRepository from '../models/user.repository';
import {createToken} from '../config/Token';
import {createUniqueUsername} from '../config/Username';
import {authorizeUser} from '../middleware/authorization';
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const device_token = req.body.device_token;
        const username = createUniqueUsername(Date.now());
        const user = await UsersRepository.createUser(username, req.body.device_token);
        return res.status(200).json({
            id: user.insertId,
            username: username,
            token: createToken(username, user.insertId)
        }).end();
    } catch (error: any) {
        return res.status(500).json({message: error.message}).end();
    }
});

router.put('/update', authorizeUser,async (req, res) => {
    try {
        const {username} = req.body;
        const user = await UsersRepository.updateUser(Number(req.body.user.id), username);
        return res.status(200).json({
            id: Number(req.body.user.id),
            username: username,
        }).end();
    } catch (error: any) {
        return res.status(500).json({message: error.message}).end();
    }
});

export default router;
