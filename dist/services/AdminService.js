import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export class AdminService {
    async find(id) {
        const admin = await prisma.admin.findFirst({
            where: {
                id,
            },
        });
    }
}
