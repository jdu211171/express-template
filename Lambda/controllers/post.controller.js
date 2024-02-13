"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_repository_1 = __importDefault(require("../models/post.repository"));
const user_repository_1 = __importDefault(require("../models/user.repository"));
const configFCM_1 = __importDefault(require("../middleware/configFCM"));
const router = express_1.default.Router();
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = yield post_repository_1.default.allPosts(currentLoad, limit, Number(req.body.user.id));
        return res.status(200).json(posts).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = yield post_repository_1.default.search(currentLoad, limit, req.body.keyword, Number(req.body.user.id));
        return res.status(200).json(posts).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.post('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_list = req.body.list.map((id) => Number(id));
        const posts = yield post_repository_1.default.list(id_list, req.body.user.id);
        return res.status(200).json(posts).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.post('/search_list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_list = req.body.list.map((id) => Number(id));
        const posts = yield post_repository_1.default.searchList(id_list, req.body.keyword, req.body.user.id);
        return res.status(200).json(posts).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.get('/find/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [post] = yield post_repository_1.default.findPost(Number(req.params.id));
        if (!post) {
            return res.status(404).json({ message: 'Post not found' }).end();
        }
        return res.status(200).json(post).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.get('/private', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = yield post_repository_1.default.userPost(currentLoad, limit, req.body.user.id);
        if (!posts) {
            return res.status(404).json({ message: 'Post not found' }).end();
        }
        return res.status(200).json(posts).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield post_repository_1.default.createPost(Number(req.body.user.id), req.body.content);
        const [find] = yield post_repository_1.default.findPost(newPost.insertId);
        const users = yield user_repository_1.default.allUsers();
        const deviceTokens = users.map((user) => user.device_token); // change tokens for array string[]
        deviceTokens.forEach((device_token) => {
            console.log('Device Token:', device_token);
        });
        const messages = deviceTokens.map((device_token) => ({
            notification: {
                title: `${req.body.username}`,
                body: `${req.body.content}`,
            },
            token: device_token,
        }));
        yield Promise.all(messages.map((message) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield configFCM_1.default.send(message);
            }
            catch (e) {
                console.log(e);
            }
        })));
        return res.status(200).json(find).end();
    }
    catch (error) {
        return res.status(500).json({ message: error }).end();
    }
}));
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [find] = yield post_repository_1.default.findPost(Number(req.params.id));
        if (find.user_id === req.body.user.id) {
            const updatedPost = yield post_repository_1.default.updatePost(Number(req.params.id), req.body.content);
            return res.status(200).json({ message: 'Updated successfully!' }).end();
        }
        else {
            return res.status(403).json({ message: 'Bad permissions!' }).end();
        }
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [find] = yield post_repository_1.default.findPost(Number(req.params.id));
        if (find.user_id === req.body.user.id) {
            const deletedPost = yield post_repository_1.default.deletePost(Number(req.params.id));
            return res.status(200).json({ message: 'Deleted successfully!' }).end();
        }
        else {
            return res.status(403).json({ message: 'Bad permissions!' }).end();
        }
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
exports.default = router;
