import { NextFunction, Request, Response } from 'express';
import AdminAuthService from '../services/AdminAuthService';
import { RegisterPayload } from '../interfaces/AuthInterfaces';

export default class AuthController {
	private adminAuthService: AdminAuthService;

	constructor(adminAuthService: AdminAuthService) {
		this.adminAuthService = adminAuthService;
	}
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const payload: RegisterPayload = req.body;
			const token = await this.adminAuthService.register(payload);
			return res.json({
				success: true,
				token: token,
			});
		} catch (error: any) {
			console.log('Error in Register controller: ', error.message);
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;

			const token = await this.adminAuthService.login(email, password);
			if (!token) {
				return res.status(401).json({
					success: false,
					message: 'Invalid email or password',
				});
			}

			return res.json({
				success: true,
				token: token,
			});
		} catch (error) {
			console.log('Error in login controller: ', error);
			next(error);
		}
	}
}
