import { Prisma, orders_items } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from '../../app'
import { logInfo, logError } from '../../logging/utils'

export class OrdersItems {
    id!: number;

    @IsNotEmpty()
    item_id!: number;

    @IsNotEmpty()
    order_id!: number;

    @IsNotEmpty()
    quantity!: number;

    customizations?: { name_eng: string, name_chn: string }[] | undefined;
}

export async function getAllOrdersItems(): Promise<Record<string, unknown>[]> {
    try {
        const allOrdersItemss = await prisma.orders_items.findMany(
            {
                orderBy: [
                    {
                        id: 'asc',
                    },
                ]
            }
        )
        logInfo(getAllOrdersItems.name, `Success!`)
        return allOrdersItemss;
    } catch (err) {
        logInfo(getAllOrdersItems.name, `${err}`)
        throw err;
    }
}

export async function getOneOrdersItems(id: number): Promise<orders_items> {
    console.log('arewe fkodkfogksodf')
    try {
        const oneOrdersItems = await prisma.orders_items.findUnique({
            where: {
                id: id,
            },
        })
        if (oneOrdersItems !== null) {
            await validateClassFields(OrdersItems, <JSON><unknown>oneOrdersItems)
            console.log(JSON.stringify(oneOrdersItems))
            return oneOrdersItems
        }
        logInfo(getOneOrdersItems.name, `OrdersItems Record ID:${id} retrieved.`)
        return <orders_items><unknown>[]
    } catch (err) {
        logInfo(getOneOrdersItems.name, `${err}`)
        throw err;
    }
}

export async function createOrdersItems(body: JSON) {
    try {
        await validateClassFields(OrdersItems, body)
        const res = await prisma.orders_items.create({ data: <Prisma.orders_itemsCreateInput>body })
        logInfo(createOrdersItems.name, `OrdersItems Created: {id: ${res.id}, order_id: ${res.order_id}, item_id: ${res.item_id}, customizations: ${res.customizations}`)
    } catch (err) {
        logError(createOrdersItems.name, `${err}`);
        throw new Error(`${err} `)
    }
}

export async function createOrdersItemsBulk(items: {
    order_id: any;
    item_id: any;
    quantity: any;
    customizations: any;
    timestamp: string;
    price: any;
    custom_price: any;
    custom_item_id: any;
}[]) {
    try {
        // items.forEach(async item => {
        //     await validateClassFields(OrdersItems, item)
        // })

        console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
        console.log(items)
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa')

        const res = await prisma.orders_items.createMany({ data: <Prisma.orders_itemsCreateManyInput>items })

        logInfo(createOrdersItemsBulk.name, `OrdersItemsBulk Created: {id: ${res})`)
    } catch (err) {
        logError(createOrdersItemsBulk.name, `${err}`);
        throw new Error(`${err} `)
    }
}

export async function deleteOneOrdersItems(id: number): Promise<void> {
    try {
        const res = await prisma.orders_items.delete({
            where: { id: id },
        })
        logInfo(deleteOneOrdersItems.name, `OrdersItems Deleted: {id: ${res.id}, total: ${res.order_id}, customer_id: ${res.item_id}`)
    } catch (err) {
        logError(deleteOneOrdersItems.name, `${err}`);
        throw new Error(`${err} `)
    }
}

export async function deleteAllOrdersItemsWithOrderId(id: number): Promise<void> {
    try {
        const res = await prisma.orders_items.deleteMany({
            where: { order_id: id },
        })
        logInfo(deleteAllOrdersItemsWithOrderId.name, `OrdersItems Deleted: {id: ${res}`)
    } catch (err) {
        logError(deleteAllOrdersItemsWithOrderId.name, `${err}`);
        throw new Error(`${err} `)
    }
}

export async function updateOrdersItems(id: number, order: Prisma.orders_itemsUncheckedUpdateInput): Promise<void> {
    try {
        const res = await prisma.orders_items.update({
            where: { id: id },
            data: {
                order_id: order.order_id,
                item_id: order.item_id
            },
        })
        logInfo(updateOrdersItems.name, `OrdersItems Updated: {id: ${res.id}, total: ${res.order_id}, item_id: ${res.item_id}, customizations: ${res.customizations}`)
    } catch (err) {
        logError(updateOrdersItems.name, `${err}`);
        throw new Error(`${err} `)
    }
}
