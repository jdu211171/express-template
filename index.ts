import 'dotenv/config'
import express, {Application, Express} from "express";
const cors = require('cors');
import userController from "./controllers/user.controller";
import postController from "./controllers/post.controller";
import reactionController from "./controllers/reaction.controller";
import commentController from "./controllers/comment.controller";
import {authorizeUser} from "./middleware/authorization";
import serverless from 'serverless-http';
import {initializeApp, applicationDefault } from 'firebase-admin/app';
const port = 3000;

const app: Express = express();

app.use(express.json());

app.use('/user', userController);
app.use(authorizeUser);
app.use('/post', postController);
app.use('/reaction', reactionController);
app.use('/comment', commentController);


app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

export const handler = serverless(app);
