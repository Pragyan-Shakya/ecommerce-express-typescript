import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
	status?: number;
}

export function errorHandler(
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const status = err.status || 500;
	const message = err.message || 'Internal Server Error!';

	res.status(status).json({
		message,
	});
}
