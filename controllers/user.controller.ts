import express from 'express';
import UsersRepository from '../models/user.repository';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const data = req.body;
        const user = await UsersRepository.createUser(data);
        res.status(200).json(user).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const id = Number(req.body.id);
        const user = await UsersRepository.findUserById(id);
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
        const id = Number(req.body.id);
        const data = req.body;
        const user = await UsersRepository.updateUserById(id, data);
        res.status(200).json(user).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = Number(req.body.id);
        const user = await UsersRepository.deleteUserById(id);
        res.status(200).json(user).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

export default router;