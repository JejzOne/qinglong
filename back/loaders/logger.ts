import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config';
import path from 'path';

const levelMap: Record<string, string> = {
  info: 'ℹ️', // info图标
  warn: '⚠️', // 警告图标
  error: '❌', // 错误图标
  debug: '🐛', // debug调试图标
}

const customFormat = winston.format.combine(
  winston.format.splat(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.align(),
  winston.format.printf((i) => `[${levelMap[i.level]}${i.level}] [${[i.timestamp]}]: ${i.message}`),
);

const defaultOptions = {
  format: customFormat,
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "7d",
};

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(config.systemLogPath, '%DATE%.log'),
      ...defaultOptions,
    })
  ],
});

export default LoggerInstance;
