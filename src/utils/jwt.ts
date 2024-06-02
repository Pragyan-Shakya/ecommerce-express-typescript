import jwt from 'jsonwebtoken';
import { Admin } from '../interfaces/AdminInterfaces';
import { Tokens } from '../interfaces/AuthInterfaces';

const JWT_SECRET_KEY = 'test-secret';
const REFRESH_SECRET_KEY = 'refresh-secret';
const JWT_EXPIRES_IN = '1h';
const REFRESH_EXPIRES_IN = '7d';

export function generateToken(admin: Admin): Tokens {
	const accessToken = jwt.sign(admin, JWT_SECRET_KEY, {
		expiresIn: JWT_EXPIRES_IN,
	});
	const refreshToken = jwt.sign({ adminId: admin.id }, REFRESH_SECRET_KEY, {
		expiresIn: REFRESH_EXPIRES_IN,
	});
	return { accessToken, refreshToken };
}

export function verifyToken(token: string, type: string = 'accessToken') {
	return jwt.verify(
		token,
		type === 'accessToken' ? JWT_SECRET_KEY : REFRESH_SECRET_KEY,
	);
}
