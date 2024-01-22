import express from 'express';
import CommentRepository from "../models/comment.repository";

const router = express.Router();

router.get('/all/:id', async (req, res) => {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    const post_id = Number(req.params.id);
    try {
        const comments = await CommentRepository.allComments(post_id, currentLoad, limit);
        if (comments) {
            return res.status(200).json(comments).end();
        } else {
            return res.status(404).json({message: 'Comment not found'}).end();
        }
    } catch (error: any) {
        return res.status(500).json({message: error.message}).end();
    }
});

router.post('/create/:id', async (req, res) => {
    try {
        const comment = await CommentRepository.createComment(Number(req.params.id), req.body.sentence, Number(req.body.user.id));
        res.status(200).json({message: 'Comment created successfully!'}).end();
    } catch (error: any) {
        res.status(500).json({message: error.message}).end();
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const comment = await CommentRepository.updateComment(Number(req.params.id), req.body.sentence);
        res.status(200).json({message: 'Comment updated successfully!'}).end();
    } catch (error: any) {
        res.status(500).json({message: error.message}).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const comment = await CommentRepository.deleteComment(Number(req.params.id));
        res.status(200).json({message: 'Comment deleted successfully!'}).end();
    } catch (error: any) {
        res.status(500).json({message: error.message}).end();
    }
});

export default router;