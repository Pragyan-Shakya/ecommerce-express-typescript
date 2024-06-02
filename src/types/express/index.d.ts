import { Request } from 'express';
import { Admin } from '../../interfaces/AdminInterfaces';

declare module 'express' {
	export interface Request {
		admin?: Admin;
	}
}
