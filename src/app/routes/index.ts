import apiRoutes from './routes';
import express from 'express';

const router = express.Router();

apiRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
