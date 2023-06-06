import { successLog, errorLog } from '../shared/logger';
import mongoose from 'mongoose';
import config from '../config';
import app from '../app';

const dbConnection = async () => {
  try {
    const { port, dbURL } = config;

    await mongoose.connect(dbURL as string);
    successLog.info('MongoDB Connection ==> OK ✅');

    app.listen(port, () => successLog.info(`Server run on port ==> ${port}`));
  } catch (err) {
    errorLog.error('Failed to connect', err);
  }
};

dbConnection();
