import startServer from './server'
import { PrismaClient } from "@prisma/client"
import 'reflect-metadata';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const prisma = new PrismaClient()
export let thermalPrinterInterface: string | null = null;

async function getThermalPrinterInterface(): Promise<string> {
    try {
        const { stdout } = await exec('ls /dev/usb | grep lp');
        return `/dev/usb/${stdout.trim()}`
    } catch (err: unknown) {
        throw new Error('Unable to find thermal printer.')
    };
}

async function main() {
    try {
        startServer()
        thermalPrinterInterface = await getThermalPrinterInterface()
    } catch (err) {
        process.exit(1);
    } finally {
        await prisma.$disconnect()
    }
}

main()