import apiRoutes from './paths';
import express from 'express';

const router = express.Router();

apiRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
