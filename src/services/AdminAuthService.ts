import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '@prisma/client';
import { generateToken, verifyToken } from '../utils/jwt';
import { RegisterPayload, Tokens } from '../interfaces/AuthInterfaces';
import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '../errors/CustomErrors';
import { Admin } from '../interfaces/AdminInterfaces';

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
	}: RegisterPayload): Promise<Tokens> {
		try {
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
				select: {
					id: true,
					email: true,
					name: true,
					status: true,
				},
			});
			return await this.getToken(admin);
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

	async login(email: string, psw: string): Promise<Tokens> {
		try {
			const admin = await prisma.admin.findUnique({
				where: { email },
			});

			if (!admin) {
				throw new NotFoundError(
					`Admin with email "${email}" not found!`,
				);
			}

			const chkPsw = await bcrypt.compare(psw, admin.password);
			if (!chkPsw) {
				throw new UnauthorizedError(`Invalid email or password`);
			}
			const { password, ...tokenUser } = admin;
			return await this.getToken(tokenUser);
		} catch (error: any) {
			throw error;
		}
	}

	async refresh(token: string): Promise<Tokens> {
		try {
			const adminId = verifyToken(token, 'refreshToken') as {
				adminId: number;
			};
			const refreshTokenCheck = await prisma.adminRefreshToken.findFirst({
				where: {
					token: token,
					adminId: adminId.adminId,
				},
				select: {
					id: true,
					admin: true,
				},
			});

			if (!refreshTokenCheck) {
				throw new UnauthorizedError('Invalid refresh token');
			}
			const { password, ...tokenUser } = refreshTokenCheck.admin;
			const { accessToken, refreshToken } = generateToken(tokenUser);

			await prisma.adminRefreshToken.update({
				data: {
					token: refreshToken,
				},
				where: {
					id: refreshTokenCheck.id,
				},
			});

			return { accessToken, refreshToken };
		} catch (error) {
			console.log('Error in Refresh: ', error);

			throw new UnauthorizedError('Invalid refresh token');
		}
	}

	async getToken(admin: Admin) {
		try {
			const { accessToken, refreshToken } = generateToken(admin);
			await prisma.adminRefreshToken.create({
				data: {
					adminId: admin.id,
					token: refreshToken,
				},
			});

			return { accessToken, refreshToken };
		} catch (error) {
			console.log('Error in storing refresh token: ', error);
			throw error;
		}
	}
}
