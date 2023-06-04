import userRouter from './app/modules/user/Route';
import express, { Application } from 'express';
import welcome from './utils/welcome';
import cors from 'cors';

const app: Application = express();

app.use(cors()); // use cors
app.use(express.json()); // parsing data...
app.use(express.urlencoded({ extended: true }));

const userRoute = '/api/v1/users/';

app.use(userRoute, userRouter);

app.get('/', welcome);

export default app;
