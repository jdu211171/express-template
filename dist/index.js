"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
// import postController from "./controllers/post.controller";
// import reactionController from "./controllers/reaction.controller";
// import commentController from "./controllers/comment.controller";
// import {authorizeUser} from "./middleware/authorization";
// import serverless from 'serverless-http';
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/user', user_controller_1.default);
// app.use(authorizeUser);
// app.use('/post', postController);
// app.use('/reaction', reactionController);
// app.use('/comment', commentController);
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
// export const handler = serverless(app);
