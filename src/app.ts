import startServer from './server'
import { PrismaClient } from "@prisma/client"
import 'reflect-metadata';

const prisma = new PrismaClient()

async function main() {
    try {
        startServer(prisma)
    } catch (err) {
        throw err
    } finally {
        await prisma.$disconnect()
    }
}

main()