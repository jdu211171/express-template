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
const router = express_1.default.Router();
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    try {
        const posts = yield post_repository_1.default.allPosts(currentLoad, limit);
        return res.status(200).json(posts).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.get('/find/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_repository_1.default.findPost(Number(req.params.id));
        if (!post) {
            return res.status(404).json({ message: 'Post not found' }).end();
        }
        return res.status(200).json(post).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield post_repository_1.default.createPost(Number(req.body.user.id), req.body.content);
        return res.status(200).json(newPost).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield post_repository_1.default.updatePost(Number(req.params.id), req.body.content);
        return res.status(200).json(updatedPost).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield post_repository_1.default.deletePost(Number(req.params.id));
        return res.status(200).json(deletedPost).end();
    }
    catch (e) {
        return res.status(500).json({ message: e.message }).end();
    }
}));
exports.default = router;
