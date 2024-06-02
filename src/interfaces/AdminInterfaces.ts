import { Gender, Status } from '@prisma/client';

export interface Admin {
	id: number;
	name: string;
	email: string;
	phone?: string | null;
	address?: string | null;
	avatar?: string | null;
	gender?: Gender | null;
	status: Status;
	createdAt?: Date;
	updatedAt?: Date;
}
