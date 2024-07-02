import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import adminRouter from './admin';
import locationsRouter from './locations';
import ticketsRouter from './tickets';
import authRouter from './authentication';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.disable('x-powered-by');

app.use(cors())

app.use(bodyParser.json());

app.get('/api/v1/health', (_, res) => res.send('OK'));

app.use('/api/v1/admin', adminRouter);

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/locations', locationsRouter);

app.use('/api/v1/tickets', ticketsRouter);

console.log(`Starting server on port: ${PORT}`);

app.listen(PORT);
