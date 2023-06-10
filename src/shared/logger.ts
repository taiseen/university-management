import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
const { combine, timestamp, label, printf } = format; // prettyPrint

// our custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  // return `${date.toDateString()} | ${hour}:${minute}:${second} - [${label}] ${level}: ${message}`;
  return `${date
    .toISOString()
    .substring(
      0,
      10
    )} | ${hour}:${minute}:${second} - [${label}] ${level}: ${message}`;
});

// 🟩🟩🟩 for success log 🟩🟩🟩
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat), // prettyPrint()
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phU-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// 🟥🟥🟥 for error log 🟥🟥🟥
const errorLog = createLogger({
  level: 'error',
  format: combine(label({ label: 'PH' }), timestamp(), myFormat), // prettyPrint()
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phU-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLog };
