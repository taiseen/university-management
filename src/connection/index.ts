import { logger, errorLog } from '../shared/logger';
import { Server } from 'http';
import mongoose from 'mongoose';
import config from '../config';
import app from '../app';

let server: Server;

// sync error handler | if anything undefined...
process.on('uncaughtException', error => {
  errorLog.error(error);
  process.exit(1);
});

const dbConnection = async () => {
  try {
    const { port, dbURL } = config;

    await mongoose.connect(dbURL as string);
    logger.info('MongoDB Connection ==> OK ✅');

    server = app.listen(port, () =>
      logger.info(`Server run on port ==> ${port}`)
    );
  } catch (err) {
    errorLog.error('Failed to connect', err);
  }

  // async error handler
  process.on('unhandledRejection', error => {
    // console.log(
    //   '🔴 unhandledRejection detected... Server going to close... 🔴 '
    // );

    if (server) {
      server.close(() => {
        errorLog.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

dbConnection();

// console.log(x);

process.on('SIGTERM', error => {
  logger.info(error);
  if (server) {
    server.close();
  }
});
