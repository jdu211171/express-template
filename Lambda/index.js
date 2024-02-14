"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const post_controller_1 = __importDefault(require("./controllers/post.controller"));
const reaction_controller_1 = __importDefault(require("./controllers/reaction.controller"));
const comment_controller_1 = __importDefault(require("./controllers/comment.controller"));
const authorization_1 = require("./middleware/authorization");
const serverless_http_1 = __importDefault(require("serverless-http"));
const cors_1 = __importDefault(require("cors"));
const port = 3001;
const app = (0, express_1.default)();
app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use(express_1.default.json());
app.use('/user', user_controller_1.default);
app.use(authorization_1.authorizeUser);
app.use('/post', post_controller_1.default);
app.use('/reaction', reaction_controller_1.default);
app.use('/comment', comment_controller_1.default);
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use((0, cors_1.default)({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}));
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
exports.handler = (0, serverless_http_1.default)(app);
