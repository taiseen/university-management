import express, { Application } from 'express';
import welcome from './utils/welcome';
import cors from 'cors';

const app: Application = express();

app.use(cors()); // use cors
app.use(express.json()); // parsing data...
app.use(express.urlencoded({ extended: true }));

app.get('/', welcome);

export default app;
