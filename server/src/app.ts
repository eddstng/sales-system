import startServer from './server'
import { PrismaClient } from "@prisma/client"
import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

const util = require('util');
const exec = util.promisify(require('child_process').exec);
let printerConnectionRetries = 0;
let retryDelay = 0;

export const prisma = new PrismaClient()
export let thermalPrinterInterface: string | null = null;

async function getThermalPrinterInterface(): Promise<string> {
    let thermalPrinterInterface = null;
    try {
        const { stdout } = await exec('ls /dev/usb | grep lp');
        thermalPrinterInterface = `/dev/usb/${stdout.trim()}`
        console.log(`Success: Found thermal printer after ${printerConnectionRetries} retries.`)
    } catch (err) {
        if ((err.message).includes('Command failed: ls /dev/usb | grep lp') && printerConnectionRetries < 10) {
            printerConnectionRetries++;
            retryDelay += 1000;
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
            await delay(retryDelay)
            console.log(`Warning: Unable to find thermal printer interface after ${printerConnectionRetries}/10 retries.`)
            console.log(`Warning: Attempting search again after ${retryDelay / 1000} seconds.`)
            thermalPrinterInterface = await getThermalPrinterInterface()
        }
    }
    if (thermalPrinterInterface === null) {
        console.log(`Error: Unable to find thermal printer after ${printerConnectionRetries} retries.`)
        console.log(`Error: Terminating app.`)
        throw new Error(`Unable to find thermal printer after ${printerConnectionRetries} retries.`)
    }
    return thermalPrinterInterface
}

async function main() {
    try {
        if (process.env.PRINTING !== 'false') {
            thermalPrinterInterface = await getThermalPrinterInterface()
        }
        startServer()
    } catch (err) {
        process.exit(1);
    } finally {
        await prisma.$disconnect()
    }
}

main()