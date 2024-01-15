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

export function verifyToken(token: string, username: string | null | undefined, user_id: number | undefined, created_at: Date | null | undefined) {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

        if (decoded.username === username && decoded.user_id === user_id, decoded.created_at === created_at) {
            return true;
        } else {
            return false;
        }

    } catch (e: any) {
        console.error(e);
        return false;
    }
}
