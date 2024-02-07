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
const reaction_repository_1 = __importDefault(require("../models/reaction.repository"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exists_reaction = yield reaction_repository_1.default.getReactionById(req.body.user.id, req.body.post_id);
        if (exists_reaction.length === 0) {
            yield reaction_repository_1.default.createReaction(req.body.user.id, req.body.post_id, 1);
        }
        else {
            yield reaction_repository_1.default.updateReaction(req.body.user.id, req.body.post_id, exists_reaction[0].reaction_type === 1 ? 0 : 1);
        }
        res.status(200).json({ message: 'Reaction created successfully!' }).end();
    }
    catch (error) {
        res.status(500).json({ message: error.message }).end();
    }
}));
// router.get('/all/:id', async (req, res) => {
//     try {
//         const reaction = await ReactionRepository.getAllReactionsByPostId(Number(req.params.id));
//         if (reaction) {
//             res.status(200).json(reaction).end();
//         } else {
//             res.status(404).json({message: 'Reaction not found'}).end();
//         }
//     } catch (error: any) {
//         res.status(500).json({message: error.message}).end();
//     }
// });
// router.get('/find', async (req, res) => {
//     try {
//         const reaction = await ReactionRepository.getReactionById(req.body.user.id);
//         if (reaction) {
//             res.status(200).json(reaction).end();
//         } else {
//             res.status(404).json({ message: 'Reaction not found' }).end();
//         }
//     } catch (error: any) {
//         res.status(500).json({ message: error.message }).end();
//     }
// });
// router.put('/update', async (req, res) => {
//     try {
//         const reaction = await ReactionRepository.updateReaction(req.body.user.id, req.body);
//         res.status(200).json({message: 'Reaction updated successfully!'}).end();
//     } catch (error: any) {
//         res.status(500).json({message: error.message}).end();
//     }
// });
// router.delete('/delete/:id', async (req, res) => {
//     try {
//         const reaction = await ReactionRepository.deleteReaction(Number(req.params.id));
//         res.status(200).json({message: 'Reaction deleted successfully!'}).end();
//     } catch (error: any) {
//         res.status(500).json({message: error.message}).end();
//     }
// });
exports.default = router;
