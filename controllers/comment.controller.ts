import express from 'express';
import CommentRepository from "../models/comment.repository";

const router = express.Router();

router.get('/all/:id', async (req, res) => {
    try {
        const comments = await CommentRepository.getAllComment(req.body.id);
        if (comments) {
            const postComments = comments.filter(comment => comment.post_id === Number(req.body.id));
            return res.status(200).json(postComments).end();
        } else {
            return res.status(404).json({ message: 'Reaction not found' }).end();
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message }).end();
    }
});

router.post('/create/:id', async (req, res) => {
    try {
        const comment = await CommentRepository.createComment({ ...req.body });
        res.status(200).json(comment).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const comment = await CommentRepository.updateComment(Number(req.body.id), req.body);
        res.status(200).json(comment).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const comment = await CommentRepository.deleteComment(Number(req.params.id));
        res.status(200).json(comment).end();
    } catch (error: any) {
        res.status(500).json({ message: error.message }).end();
    }
});

export default router;
