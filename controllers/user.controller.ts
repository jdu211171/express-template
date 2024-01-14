import express from 'express';
import UsersRepository from '../models/user.repository';
import configuration from '../config/config';
import fs from 'fs';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const fileContents = fs.readFileSync('names.txt', 'utf8').split('\n');
        const user = await UsersRepository.createUser({
            "username": fileContents[configuration.userCount]
        });
        res.status(200).json(user).end();
        configuration.userCount++;
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const user = await UsersRepository.findUserById(Number(req.body.id));
        if (!user) {
            res.status(404).json({ message: 'User not found' }).end();
        } else {
            res.status(200).json(user).end();
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const user = await UsersRepository.updateUserById(Number(req.body.id), req.body);
        res.status(200).json(user).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await UsersRepository.deleteUserById(Number(req.body.id));
        res.status(200).json(user).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

export default router;