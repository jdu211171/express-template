import 'dotenv/config'
import express, {Express} from "express";
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import reactionController from "./controllers/reaction.controller";
// import commentController from "./controllers/comment.controller";
import {authorizeUser} from "./middleware/authorization";
// import serverless from 'serverless-http';
const port = 3000;

const app: Express = express();

app.use(express.json());

app.use('/user', userController);
app.use(authorizeUser);
app.use('/post', postController);
app.use('/reaction', reactionController);
// app.use('/comment', commentController);
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
// export const handler = serverless(app);
