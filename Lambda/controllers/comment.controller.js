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
const comment_repository_1 = __importDefault(require("../models/comment.repository"));
const router = express_1.default.Router();
router.get('/all/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentLoad = Number(req.query.currentLoad) || 1;
    const limit = Number(req.query.limit) || 10;
    const post_id = Number(req.params.id);
    try {
        const comments = yield comment_repository_1.default.allComments(post_id, currentLoad, limit);
        if (comments) {
            return res.status(200).json(comments).end();
        }
        else {
            return res.status(404).json({ message: 'Comment not found' }).end();
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message }).end();
    }
}));
router.post('/create/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created_comment = yield comment_repository_1.default.createComment(Number(req.params.id), req.body.sentence, Number(req.body.user.id));
        const [find] = yield comment_repository_1.default.findComment(created_comment.insertId);
        res.status(200).json(find).end();
    }
    catch (error) {
        res.status(500).json({ message: error.message }).end();
    }
}));
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [find] = yield comment_repository_1.default.findComment(Number(req.params.id));
        if (find.user_id === req.body.user.id) {
            const comment = yield comment_repository_1.default.updateComment(Number(req.params.id), req.body.sentence);
            res.status(200).json({ message: 'Comment updated successfully!' }).end();
        }
        else {
            return res.status(403).json({ message: 'Bad permissions!' }).end();
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message }).end();
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [find] = yield comment_repository_1.default.findComment(Number(req.params.id));
        if (find.user_id === req.body.user.id) {
            const comment = yield comment_repository_1.default.deleteComment(Number(req.params.id));
            res.status(200).json({ message: 'Comment deleted successfully!' }).end();
        }
        else {
            return res.status(403).json({ message: 'Bad permissions!' }).end();
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message }).end();
    }
}));
exports.default = router;
