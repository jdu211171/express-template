import * as process from "process";
import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../config/JWTConfig";
import {userInfo} from "../controllers/user.controller";

export function authorizeUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.error('Token is missing');
            return res.status(401).json({message: 'Missing token'}).end();
        }

        const token = authHeader!.replace('Authorization ', process.env.TOKEN_SECRET!);

        const user_id = req.body.user_id;

        userInfo(user_id)
            .then((user) => {
                    if (verifyToken(token, user?.username, user?.id, user?.created_at)) {
                        console.log(token, user?.username, user?.id, user?.created_at);
                        return next();
                    } else {
                        return res.status(403).json({message: 'Invalid token'}).end();
                    }
                }
            );


    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'}).end();
    }
}
