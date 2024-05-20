import express, { Express, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import dotenv from 'dotenv';

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
app.use(express.urlencoded({ extended: true }));

//Routes
app.get('/', (req: Request, res: Response) => {
	res.send('Hello World! HI');
});

//Listener
app.listen(port, () => {
	console.log(`App listing in http://localhost:${port}`);
});
