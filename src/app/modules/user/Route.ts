import express, { Request, Response } from 'express';

const router = express.Router();

const createUserPath = '/create-user';

router.post(createUserPath, (req: Request, res: Response) => {
  return res.status(200);
});

export default router;
