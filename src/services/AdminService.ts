import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class AdminService {
	public async find(id: number) {
		const admin = await prisma.admin.findFirst({
			where: {
				id,
			},
		});
	}
}
