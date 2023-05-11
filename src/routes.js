import { Router } from 'express';
import * as Posts from './controllers/postController';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'welcome to our blog api!' });
});

router.post('/posts', async (req, res) => {
    const post = req.body;
    try {
        const result = await Posts.createPost(post);
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
});

router.get('/posts', async (req, res) => {
    try {
        const result = await Posts.getPosts();
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
});

router.get('/posts/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    try {
        const result = await Posts.searchPosts(searchQuery);
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
});

router.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Posts.getPost(id);
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
});

router.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const fields = req.body;
    try {
        const result = await Posts.updatePost(id, fields);
        return res.json(result);
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
});

router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Posts.deletePost(id);
        return res.json({ message: 'Post deleted!', post: result });
    } catch (error) {
        return res.status(422).json({ error: error.message });
    }
});

export default router;
