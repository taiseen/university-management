import globalErrorHandler from './app/middleware/globalErrorHandler';
import routeNotFound from './utils/routeNotFound';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import welcome from './utils/welcome';
import router from './app/routes';
import cors from 'cors';

const app: Application = express();

app.use(cors()); // use cors
app.use(cookieParser());
app.use(express.json()); // parsing data...
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router); // all routes present here...

app.use(globalErrorHandler); // global error handling...

app.get('/', welcome); // welcome info display

app.use('/', routeNotFound); // route not found | 404 | for CRUD operation

export default app;
