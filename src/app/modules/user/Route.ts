import { userController } from './Controller';
import express from 'express';

const router = express.Router();

const createUserPath = '/create-user';

router.post(createUserPath, userController.newUserCreate);

export const userRoutes = router;
