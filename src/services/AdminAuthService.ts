import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt';
import { RegisterPayload } from '../interfaces/AuthInterfaces';

const prisma: PrismaClient = new PrismaClient();
export default class AdminAuthService {
	async register({
		name,
		email,
		password,
		phone,
		address,
		avatar,
		gender,
		status,
	}: RegisterPayload): Promise<string> {
		try {
			console.log(password);

			const encryptedPassword = await bcrypt.hash(password, 10);
			const admin = await prisma.admin.create({
				data: {
					name,
					email,
					password: encryptedPassword,
					phone,
					address,
					avatar,
					gender,
					status,
				},
			});
			return generateToken(admin.id);
		} catch (error) {
			console.log('Error in registering admin: ', error);
			throw new Error('Error in registering admin');
		}
	}

	async login(email: string, password: string): Promise<string | null> {
		try {
			const admin = await prisma.admin.findUnique({
				where: { email },
			});

			if (!admin) return null;

			const chkPsw = await bcrypt.compare(password, admin.password);
			if (!chkPsw) return null;

			return generateToken(admin.id);
		} catch (error) {
			console.log('Error in login: ', error);
			throw new Error('Error in login');
		}
	}
}
