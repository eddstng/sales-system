import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, label } = format;
import expressWinston from 'express-winston';

interface Logger {
    debug: (message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
}

const customColours = {
    colors: {
        info: 'green',
        error: 'red',
        warning: 'yellow'
    }
};

winston.addColors(customColours.colors);

const customFormat = printf(({ level, message, label, timestamp }) => {
    if (level === "\u001b[32minfo\u001b[39m") {
        return `[🟢] ${timestamp} [${level}] | [${label}]: ${message}`;

    }
    if (level === "\u001b[33mwarn\u001b[39m") {
        return `[🟡] ${timestamp} [${level}] | [${label}]: ${message}`;
    }
    if (level === '\u001b[31merror\u001b[39m') {
        return `[🔴] ${timestamp} [${level}]| [${label}]: ${message}`;
    }
    return `${timestamp} [${level}] ${level == '\u001b[31merror\u001b[39m' ? '| ' : ' | '} [${label}]: ${message}`;
});

const config = {
    format: combine(
        winston.format.colorize(),
        label({ label: 'sales-system' }),
        timestamp(),
        customFormat
    ),
    transports: [new transports.Console()]
};

export const logger: Logger = createLogger(config);
export const loggerMiddleware = expressWinston.logger({
    ...config,
    msg: 'HTTP {{req.method}} {{req.url}}',
    requestWhitelist: [...expressWinston.requestWhitelist, 'body'],
    responseWhitelist: [...expressWinston.responseWhitelist, 'body']
});
export const errorLoggerMiddleware = expressWinston.errorLogger(config);
