"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const post_controller_1 = __importDefault(require("./controllers/post.controller"));
const reaction_controller_1 = __importDefault(require("./controllers/reaction.controller"));
const comment_controller_1 = __importDefault(require("./controllers/comment.controller"));
const authorization_1 = require("./middleware/authorization");
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_controller_1.default);
app.use(authorization_1.authorizeUser);
app.use('/post', post_controller_1.default);
app.use('/reaction', reaction_controller_1.default);
app.use('/comment', comment_controller_1.default);
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
