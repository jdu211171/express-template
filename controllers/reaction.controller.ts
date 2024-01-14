import express from 'express';
import {ReactionRepository} from "../models/reaction.repository";

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        res.status(200).json(await ReactionRepository.createReaction(req.body)).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const reaction = await ReactionRepository.getReactionById(Number(req.body.id));
        if (reaction) {
            res.status(200).json(reaction).end();
        } else {
            res.status(404).json({ message: 'Reaction not found' }).end();
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        res.status(200).json(await ReactionRepository.updateReaction(Number(req.body.id), req.body)).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        res.status(200).json(await ReactionRepository.deleteReaction(Number(req.body.id))).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

export default router;
