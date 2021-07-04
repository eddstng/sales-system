import { Prisma, orders_items } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from '../../app'
import { logInfo, logError } from '../../logging/utils'

export class OrderItem {
    id!: number;

    @IsNotEmpty()
    item_id!: number;

    @IsNotEmpty()
    order_id!: string;
}

export async function getAllOrderItem(): Promise<Record<string, unknown>[]> {
    try {
        const allOrderItems = await prisma.orders_items.findMany(
            {
                orderBy: [
                    {
                        id: 'asc',
                    },
                ]
            }
        )
        logInfo(getAllOrderItem.name, `[✓]`)
        return allOrderItems;
    } catch (err) {
        logInfo(getAllOrderItem.name, `[✗] Error: ${err}`)
        throw new Error(`${err}`) 
    }
}

export async function getOneOrderItem(id: number): Promise<orders_items> {
    try {
        const oneOrderItem = await prisma.orders_items.findUnique({
            where: {
                id: id,
            },
        })
        if (oneOrderItem !== null) {
            await validateClassFields(OrderItem, <JSON><unknown>oneOrderItem)
            return oneOrderItem
        }
        logInfo(getOneOrderItem.name, `[✓] OrderItem Record ID:${id} retrieved.`)
        return <orders_items><unknown>[]
    } catch (err) {
        logInfo(getOneOrderItem.name, `[✗] Error: ${err}`)
        throw new Error(`${err}`)
    }
}

export async function createOrderItem(body: JSON) {
    try {
        await validateClassFields(OrderItem, body)
        const res = await prisma.orders_items.create({ data: <Prisma.orders_itemsCreateInput>body })
        logInfo(createOrderItem.name, `[✓] OrderItem Created: {id: ${res.id}, order_id: ${res.order_id}, item_id: ${res.item_id}`)
    } catch (err) {
        logError(createOrderItem.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}

export async function deleteOneOrderItem(id: number): Promise<void> {
    try {
        const res = await prisma.orders_items.delete({
            where: { id: id },
        })
        logInfo(deleteOneOrderItem.name, `[✓] OrderItem Deleted: {id: ${res.id}, total: ${res.order_id}, customer_id: ${res.item_id}`)
    } catch (err) {
        logError(deleteOneOrderItem.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}

export async function updateOrderItem(id: number, order: Prisma.orders_itemsUncheckedUpdateInput): Promise<void> {
    try {
        const res = await prisma.orders_items.update({
            where: { id: id },
            data: {
                order_id: order.order_id,
                item_id: order.item_id
            },
        })
        logInfo(updateOrderItem.name, `[✓] OrderItem Updated: {id: ${res.id}, total: ${res.order_id}, customer_id: ${res.item_id}`)
    } catch (err) {
        logError(updateOrderItem.name, err, `[✗]`);
        throw new Error(`${err} `)
    }
}
