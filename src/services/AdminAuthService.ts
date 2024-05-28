import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client';
import { generateToken } from '../utils/jwt';
import { RegisterPayload } from '../interfaces/AuthInterfaces';
import { BadRequestError, NotFoundError } from '../errors/CustomErrors';

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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				// The .code property can be accessed in a type-safe manner
				if (error.code === 'P2002') {
					throw new BadRequestError(
						'Admin with this email already exists.',
					);
				}
			}
			console.log('Error in registering admin: ', error);
			throw error;
		}
	}

	async login(email: string, password: string): Promise<string | null> {
		try {
			const admin = await prisma.admin.findUnique({
				where: { email },
			});

			if (!admin) {
				throw new NotFoundError(
					`Admin with email "${email}" not found!`,
				);
			}

			const chkPsw = await bcrypt.compare(password, admin.password);
			if (!chkPsw) return null;

			return generateToken(admin.id);
		} catch (error: any) {
			throw error;
		}
	}
}
