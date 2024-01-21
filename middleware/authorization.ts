import * as process from "process";
import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import UsersRepository from '../models/user.repository';

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

        const decoded = jwt.verify(token, 'secret') as JwtPayload;
        const user = await UsersRepository.getUserById(decoded.user_id);

        if (user?.id !== decoded.user_id) {
            console.error('Invalid token');
            return res.status(403).json({message: 'Invalid token'}).end();
        }

        req.body.user = {
            id: decoded.user_id,
            username: decoded.username,
        };

        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'}).end();
    }
}
