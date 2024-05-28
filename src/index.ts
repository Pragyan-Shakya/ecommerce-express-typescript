import express, { Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import adminAuthRouter from './routes/AdminAuthRoute';
import { errorHandler } from './middlewares/ErrorHandler';
//environment variables
dotenv.config();

const port = process.env.PORT;
const app = express();

//setup __dirname for type module
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

//middlewares
app.use(morgan('tiny'));
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get('/', (req: Request, res: Response) => {
	res.send('Hello World! HI');
});
app.use('/admin', adminAuthRouter);

//Custom Error Handler
app.use(errorHandler);

//Listener
app.listen(port, () => {
	console.log(`App listing in http://localhost:${port}`);
});
