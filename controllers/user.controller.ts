import express from 'express';
import UsersRepository from '../models/user.repository';
import {createToken} from '../config/Token';
import {createUniqueUsername} from '../config/Username';
import {authorizeUser} from '../middleware/authorization';
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const devise_token = req.body.devise_token;
        const username = createUniqueUsername(Date.now());
<<<<<<< HEAD
        const user = await UsersRepository.createUser({username, devise_token});
=======
        const user = await UsersRepository.createUser(username, req.body.device_token);
>>>>>>> c916f94fdf3aa670f29d3ca0e2208ace84db1a83
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
