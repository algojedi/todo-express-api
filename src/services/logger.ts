import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';

dotenv.config();

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
		}),
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: process.env.INFO_LOG_FILE_PATH, level: 'info' }),
		new transports.File({ filename: process.env.ERROR_LOG_FILE_PATH, level: 'error' }),
	],
});

export default logger;
