import winston from 'winston';
import path from 'path';
import fs from 'fs';

const LOG_DIR = path.join(process.cwd(), 'logs');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

export const apiLogger = winston.createLogger({
  level: 'error',
  format,
  transports: [
    new winston.transports.File({ 
      filename: path.join(LOG_DIR, 'api-error.log'), 
      level: 'error' 
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
});

export const webLogger = winston.createLogger({
  level: 'error',
  format,
  transports: [
    new winston.transports.File({ 
      filename: path.join(LOG_DIR, 'web-error.log'), 
      level: 'error' 
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
});

export const getLogContent = (type: 'api' | 'web') => {
  const filePath = path.join(LOG_DIR, `${type}-error.log`);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }
  return '';
};
