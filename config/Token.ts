import jwt, {JwtPayload} from 'jsonwebtoken';

export function createToken(username: string | null, user_id: number) {
    const payload = {
        username: username,
        user_id: user_id,
    };
    const options = {
        expiresIn: '365d',
    };
    return jwt.sign(payload, process.env.SECRET_KEY!, options);
}
