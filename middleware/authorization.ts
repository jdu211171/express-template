import * as process from "process";
import {NextFunction, Request, Response} from "express";
import {userInfo} from "../controllers/user.controller";
import jwt, {JwtPayload} from "jsonwebtoken";

export async function authorizeUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            console.error('Token is missing');
            return res.status(401).json({message: 'Missing token'}).end();
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
        const user = await userInfo(decoded.user_id);

        if (user?.id !== decoded.user_id) {
            console.error('Invalid token');
            return res.status(403).json({message: 'Invalid token'}).end();
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'}).end();
    }
}
