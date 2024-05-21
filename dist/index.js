import express from 'express';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import adminAuthRouter from './routes/AdminAuthRoute';
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
app.get('/', (req, res) => {
    res.send('Hello World! HI');
});
app.use('/admin', adminAuthRouter);
//Listener
app.listen(port, () => {
    console.log(`App listing in http://localhost:${port}`);
});
