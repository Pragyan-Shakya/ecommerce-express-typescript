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
			const { accessToken, refreshToken } =
				await this.adminAuthService.register(payload);
			return res.json({
				success: true,
				accessToken,
				refreshToken: refreshToken,
			});
		} catch (error: any) {
			console.log('Error in Register controller: ', error.message);
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;

			const { accessToken, refreshToken } =
				await this.adminAuthService.login(email, password);

			return res.json({
				success: true,
				accessToken,
				refreshToken,
			});
		} catch (error) {
			console.log('Error in login controller: ', error);
			next(error);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken: refreshTokenFromRequest } = req.body;
			const { accessToken, refreshToken } =
				await this.adminAuthService.refresh(refreshTokenFromRequest);

			return res.json({
				success: true,
				accessToken,
				refreshToken,
			});
		} catch (error) {
			console.log('Error in Refresh controller', error);
			next(error);
		}
	}
}
