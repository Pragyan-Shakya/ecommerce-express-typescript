import { Request, Response, NextFunction } from 'express';

export default class DashboardController {
	async index(req: Request, res: Response, next: NextFunction) {
		try {
			console.log(req.admin);
			res.json({
				success: true,
				message: 'Admin Dashboard',
			});
		} catch (error) {
			next(error);
		}
	}
}
