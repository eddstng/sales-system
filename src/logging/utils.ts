import { logger } from "./logger"

export function logInfo(func: string, log: string) {
    const message = `[${func}] ${log}`
    logger.info(message)
}

export function logError(func: string, err: Error, string?: string | undefined,) {
    const message = `[${func}] ${string} Error: ${err.toString().replace(/\s{2,}/g, '  ')}`;
    logger.error(message)
}