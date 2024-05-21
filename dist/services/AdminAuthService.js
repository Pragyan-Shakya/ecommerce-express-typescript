import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwt';
const prisma = new PrismaClient();
export default class AdminAuthService {
    async register({ name, email, password, phone, address, avatar, gender, status, }) {
        try {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);
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
        }
        catch (error) {
            console.log('Error in registering admin: ', error);
            throw new Error('Error in registering admin');
        }
    }
    async login(email, password) {
        try {
            const admin = await prisma.admin.findUnique({
                where: { email },
            });
            if (!admin)
                return null;
            const chkPsw = await bcrypt.compare(password, admin.password);
            if (!chkPsw)
                return null;
            return generateToken(admin.id);
        }
        catch (error) {
            console.log('Error in login: ', error);
            throw new Error('Error in login');
        }
    }
}
