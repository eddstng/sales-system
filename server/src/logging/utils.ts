import { logger } from "./logger"

export function logInfo(func: string, log: string) {
    const message = `[${func}] ${log}`
    logger.info(message)
}

export function logError(func: string, err: Error | unknown, string?: string | undefined,) {
    if (err instanceof Error) {
    const message = `[${func}] ${string}: ${err.toString().replace(/\s{2,}/g, '  ')}`;
    logger.error(message)
    }
}
