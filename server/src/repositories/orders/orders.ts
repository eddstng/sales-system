import { Prisma, orders } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from '../../app'
import { logInfo, logError } from '../../logging/utils'

export class Order {
    id!: number;

    @IsNotEmpty()
    customer_id!: number;

    @IsNotEmpty()
    total!: string;

    timestamp!: string;

    @IsNotEmpty()
    type!: number;
}

export async function getAllOrders(): Promise<Record<string, unknown>[]> {
    try {
        const allOrders = await prisma.orders.findMany(
            {
                orderBy: [
                    {
                        id: 'asc',
                    },
                ]
            }
        )
        logInfo(getAllOrders.name, `[✓]`)
        return allOrders;
    } catch (err) {
        logInfo(getAllOrders.name, `[✗] ${err}`)
        throw err;
    }
}

export async function getOneOrder(id: number): Promise<orders> {
    try {
        const oneOrder = await prisma.orders.findUnique({
            where: {
                id: id,
            },
        })
        if (oneOrder !== null) {
            await validateClassFields(Order, <JSON><unknown>oneOrder)
            return oneOrder
        }
        logInfo(getOneOrder.name, `[✓] Order Record ID:${id} retrieved.`)
        return <orders><unknown>[]
    } catch (err) {
        logInfo(getOneOrder.name, `[✗] ${err}`)
        throw err;
    }
}

export async function createOrder(body: JSON): Promise<orders> {
    try {
        await validateClassFields(Order, body)
        const res = await prisma.orders.create({ data: <Prisma.ordersCreateInput>body })
        logInfo(createOrder.name, `[✓] Order Created: {id: ${res.id}, total: ${res.total}, customer_id: ${res.customer_id}, timestamp: ${res.timestamp}}, type: ${res.type}}`)
        return res;
    } catch (err) {
        logError(createOrder.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}

export async function deleteOneOrder(id: number): Promise<void> {
    try {
        const res = await prisma.orders.delete({
            where: { id: id },
        })
        logInfo(deleteOneOrder.name, `[✓] Order Deleted: {id: ${res.id}, total: ${res.total}, customer_id: ${res.customer_id}, timestamp: ${res.timestamp}}, type: ${res.type}}`)
    } catch (err) {
        logError(deleteOneOrder.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}

export async function updateOrder(id: number, order: Prisma.ordersUncheckedUpdateInput): Promise<void> {
    try {
        const res = await prisma.orders.update({
            where: { id: id },
            data: {
                total: order.total,
                customer_id: order.customer_id,
                timestamp: order.timestamp,
                type: order.type
            },
        })
        logInfo(updateOrder.name, `[✓] Order Updated: {id: ${res.id}, total: ${res.total}, customer_id: ${res.customer_id}, timestamp: ${res.timestamp}}, type: ${res.type}}`)
    } catch (err) {
        logError(updateOrder.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}
