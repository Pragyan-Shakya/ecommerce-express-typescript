import jwt from 'jsonwebtoken';
const SECRET_KEY = 'test-secret';
export function generateToken(id) {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: '1h' });
}
export function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}
