import { Gender, Status } from '@prisma/client';

export interface Tokens {
	accessToken: string;
	refreshToken: string;
}
export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
	phone?: string;
	address?: string;
	avatar?: string;
	gender?: Gender;
	status?: Status;
}
