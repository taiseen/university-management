import { userRoutes } from './app/modules/user/Route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import express, { Application } from 'express';
import welcome from './utils/welcome';
import cors from 'cors';

const app: Application = express();

app.use(cors()); // use cors
app.use(express.json()); // parsing data...
app.use(express.urlencoded({ extended: true }));

const userRoute = '/api/v1/users';

app.use(userRoute, userRoutes);

app.get('/', welcome);

// Error Testing...
// app.get('/', (req, res) => {
//   //   throw new Error('Hello Error......');
//   //   throw new ApiError(400, 'ApiError Error......');
// });

// // async error
// app.get('/', async (req, res, next) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'));
// });

// // sync error
// app.get('/', (req, res, next) => {
//   // console.log(x);
//   throw new Error('Testing error logger...');
// });

// global error handling...
app.use(globalErrorHandler);

export default app;
