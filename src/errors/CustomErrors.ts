export class httpError extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export class BadRequestError extends httpError {
	constructor(message = 'Bad Request') {
		super(message, 400);
	}
}

export class NotFoundError extends httpError {
	constructor(message = 'Not Found') {
		super(message, 404);
	}
}

export class UnauthorizedError extends httpError {
	constructor(message = 'Unauthorized') {
		super(message, 401);
	}
}
