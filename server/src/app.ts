import startServer from './server'
import { PrismaClient } from "@prisma/client"
import 'reflect-metadata';

export const prisma = new PrismaClient()

async function main() {
    try {
        startServer()
    } catch (err) {
        throw err
    } finally {
        await prisma.$disconnect()
    }
}

main()