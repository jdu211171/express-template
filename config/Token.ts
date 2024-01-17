import jwt, {JwtPayload} from 'jsonwebtoken';

export function createToken(username: string | null, user_id: number, created_at: Date | null) {
    const payload = {
        username: username,
        user_id: user_id,
        created_at: created_at
    };
    const options = {
        expiresIn: '1h',
    };
    return jwt.sign(payload, process.env.SECRET_KEY!);
}
