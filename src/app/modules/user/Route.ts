import Controller from './Controller';
import express from 'express';

const router = express.Router();

const createUserPath = '/create-user';

router.post(createUserPath, Controller.newUserCreate);

export default router;
