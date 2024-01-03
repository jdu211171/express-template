import express, { Express, Request, Response } from "express";
import userController from "./controllers/user.controller";
const port = 3000;

const app: Express = express();

app.use(express.json());

app.use('/user', userController);

app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});