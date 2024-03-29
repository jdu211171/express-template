import express from 'express';
import PostRepository from "../models/post.repository";
import UsersRepository from '../models/user.repository';

const router = express.Router();

router.get('/all', async (req, res) => {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = await PostRepository.allPosts(currentLoad, limit, Number(req.body.user.id));
        return res.status(200).json(posts).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.post('/search', async (req, res) => {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = await PostRepository.search(currentLoad, limit, req.body.keyword, Number(req.body.user.id));
        return res.status(200).json(posts).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.post('/list', async (req, res) => {
    try {
        const id_list: number[] = req.body.list.map((id: unknown) => Number(id));
        const posts = await PostRepository.list(id_list, req.body.user.id);
        return res.status(200).json(posts).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});

router.post('/search_list', async (req, res) => {
    try {
        const id_list: number[] = req.body.list.map((id: unknown) => Number(id));
        const posts = await PostRepository.searchList(id_list, req.body.keyword, req.body.user.id);
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

router.get('/private', async (req, res) => {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = await PostRepository.userPost(currentLoad, limit, req.body.user.id)
        if (!posts) {
            return res.status(404).json({message: 'Post not found'}).end();
        }
        return res.status(200).json(posts).end();
    } catch (e: any) {
        return res.status(500).json({message: e.message}).end();
    }
});


const firebaseService = require('../middleware/configFCM');

router.post('/create', async (req, res) => {
    try {
        const newPost = await PostRepository.createPost(Number(req.body.user.id), req.body.content);
        const [find] = await PostRepository.findPost(newPost.insertId);

        // Get device_token from the user associated with the post
        const user = await UsersRepository.getUserById(req.body.user.id);

        if (user && user.device_token) {
            // Prepare FCM message
            const message = {
                notification: {
                    title: 'New Post',
                    body: `A new post has been created: ${req.body.content}`,
                },
                token: user.device_token,
            };

            // Send the FCM message
            await firebaseService.send(message);
        }

        return res.status(200).json(find).end();
    } catch (error) {
        return res.status(500).json({ message: error }).end();
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
