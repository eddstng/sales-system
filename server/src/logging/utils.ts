import { logger } from "./logger"

export function logInfo(func: string, log: string) {
    const message = `[${func}] ${log}`
    logger.info(message)
}

export function logError(func: string, err: string | Error, string?: string | undefined,) {
    const message = `[${func}]${string ? ' ' + string + ' ' : ''} ${err.toString().replace(/\s{2,}/g, '  ')}`;
    logger.error(message)
}

export function logWarn(func: string, log: string) {
    const message = `[${func}] ${log}`
    logger.warn(message)
}
