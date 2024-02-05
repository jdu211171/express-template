import express from 'express';
import PostRepository from "../models/post.repository";

const router = express.Router();

router.get('/all', async (req, res) => {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = await PostRepository.allPosts(currentLoad, limit);
        return res.status(200).json(posts).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.post('/search', async (req, res) => {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = await PostRepository.search(currentLoad, limit, req.body.keyword);
        return res.status(200).json(posts).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const [post] = await PostRepository.findPost(Number(req.params.id));
        if (!post) {
            return res.status(404).json({message: 'Post not found'}).end();
        }
        return res.status(200).json(post).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.post('/create', async (req, res) => {
    try {
        const newPost = await PostRepository.createPost(Number(req.body.user.id), req.body.content);
        const [find] = await PostRepository.findPost(newPost.insertId);
        return res.status(200).json(find).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const [find] = await PostRepository.findPost(Number(req.params.id));
        if (find.user_id === req.body.user.id) {
            const updatedPost = await PostRepository.updatePost(Number(req.params.id), req.body.content);
            return res.status(200).json({message: 'Updated successfully!'}).end();
        } else {
            return res.status(403).json({message: 'Bad permissions!'}).end();
        }
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const [find] = await PostRepository.findPost(Number(req.params.id));
        if (find.user_id === req.body.user.id) {
            const deletedPost = await PostRepository.deletePost(Number(req.params.id));
            return res.status(200).json({message: 'Deleted successfully!'}).end();
        } else {
            return res.status(403).json({message: 'Bad permissions!'}).end();
        }
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

export default router;
