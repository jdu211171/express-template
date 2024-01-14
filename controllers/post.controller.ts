import express from 'express';
import PostRepository from "../models/post.repository";

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const posts = await PostRepository.allPosts();
        res.status(200).json(posts).end();
    } catch (e: any) {
        res.status(500).json({ message: e.message }).end();
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const post = await PostRepository.findPost(Number(req.body.id));
        if (!post) {
            res.status(404).json({ message: 'Post not found' }).end();
        } else {
            res.status(200).json(post).end();
        }
        res.status(404).json(post).end();
    } catch (e: any) {
        res.status(500).json({ message: e.message }).end();
    }
});

router.post('/create', async (req, res) => {
    try {
        const newPost = await PostRepository.createPost(req.body.user_id, req.body.content);
        res.status(200).json(newPost).end();
    } catch (e: any) {
        res.status(500).json({ message: e.message }).end();
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatedPost = await PostRepository.updatePost(Number(req.body.id), req.body.content);
        res.status(200).json(updatedPost).end();
    } catch (e: any) {
        res.status(500).json({ message: e.message }).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await PostRepository.deletePost(Number(req.body.id));
        res.status(200).json(deletedPost).end();
    } catch (e: any) {
        res.status(500).json({ message: e.message }).end();
    }
});

export default router;
