import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { UnauthorizedError } from '../errors/CustomErrors';
import { Admin } from '../interfaces/AdminInterfaces';

export function VerifyAdmin(req: Request, res: Response, next: NextFunction) {
	const token = req.headers['authorization'];
	if (!token) {
		throw new UnauthorizedError('Unauthorized');
	}
	const splitToken = token.split(' ');
	if (splitToken.length !== 2 && splitToken[0] !== 'Bearer') {
		throw new UnauthorizedError('Invalid Token Format');
	}
	try {
		const admin = verifyToken(splitToken[1]) as Admin;
		req.admin = admin;
		next();
  } catch (error: any) {
    if (error.name == 'TokenExpiredError') {
      throw new UnauthorizedError('Token Expired')
    } next(error);
	}
}
