import express from 'express';
import ReactionRepository from "../models/reaction.repository";

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const reaction = await ReactionRepository.createReaction(req.body.user.id, req.body);
        res.status(200).json({message: 'Reaction created successfully!'}).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.get('/all/:id', async (req, res) => {
    try {
        const reaction = await ReactionRepository.getAllReactionsByPostId(Number(req.params.id));
        if (reaction) {
            res.status(200).json(reaction).end();
        } else {
            res.status(404).json({ message: 'Reaction not found' }).end();
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.get('/find', async (req, res) => {
    try {
        const reaction = await ReactionRepository.getReactionById(req.body.user.id);
        if (reaction) {
            res.status(200).json(reaction).end();
        } else {
            res.status(404).json({ message: 'Reaction not found' }).end();
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.put('/update', async (req, res) => {
    try {
        const reaction = await ReactionRepository.updateReaction(req.body.user.id, req.body);
        res.status(200).json({message: 'Reaction updated successfully!'}).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const reaction = await ReactionRepository.deleteReaction(Number(req.params.id));
        res.status(200).json({message: 'Reaction deleted successfully!'}).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

export default router;
