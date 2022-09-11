import { Prisma, orders } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { validateClassFields } from "../utils";
import { prisma } from '../../app'
import { logInfo, logError } from '../../logging/utils'
import { createOrdersItemsBulk, deleteAllOrdersItemsWithOrderId } from "../ordersItems/ordersItems";
import { createAndPrintOrderBill } from "../printOrder/printOrder";

export class Order {
    id!: number;

    @IsNotEmpty()
    customer_id!: number;

    @IsNotEmpty()
    total!: string;

    timestamp!: string;

    @IsNotEmpty()
    type!: number;

    void!: boolean;
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
        logInfo(getAllOrders.name, `Success!`)
        return allOrders;
    } catch (err) {
        logInfo(getAllOrders.name, `${err}`)
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
        logInfo(getOneOrder.name, `Order Record ID:${id} retrieved.`)
        return <orders><unknown>[]
    } catch (err) {
        logInfo(getOneOrder.name, `${err}`)
        throw err;
    }
}

export async function createOrder(body: { total: number, customer_id: number, type: number, internal: boolean }): Promise<orders> {

    let latestInternalOrderNumberToInsert = undefined;
    if (body.internal) {
        const latestInternalOrderNumber = await getLatestInternalOrderNumber();
        latestInternalOrderNumberToInsert = latestInternalOrderNumber !== null ? latestInternalOrderNumber + 1 : 1
    }

    let latestOrderNumberToInsert = undefined;
    if (!body.internal) {
        const latestOrderNumber = await getLatestOrderNumber();
        latestOrderNumberToInsert = latestOrderNumber !== null ? latestOrderNumber + 1 : 1
    }

    console.log({ ...body, number: latestOrderNumberToInsert, internal_number: latestInternalOrderNumberToInsert })
    const orderCreateInput = { ...body, number: latestOrderNumberToInsert, internal_number: latestInternalOrderNumberToInsert }

    try {
        const res = await prisma.orders.create({ data: <Prisma.ordersCreateInput>orderCreateInput })
        logInfo(createOrder.name, `Order Created: {id: ${res.id}, total: ${res.total}, customer_id: ${res.customer_id}, timestamp: ${res.timestamp}}, type: ${res.type}}`)
        return res;
    } catch (err) {
        logError(createOrder.name, `${err}`);
        throw new Error(`${err} `)
    }
}

export async function deleteOneOrder(id: number): Promise<void> {
    try {
        const res = await prisma.orders.delete({
            where: { id: id },
        })
        logInfo(deleteOneOrder.name, `Order Deleted: {id: ${res.id}, total: ${res.total}, customer_id: ${res.customer_id}, timestamp: ${res.timestamp}}, type: ${res.type}}`)
    } catch (err) {
        logError(deleteOneOrder.name, `${err}`);
        throw new Error(`${err} `)
    }
}

async function getLatestInternalOrderNumber(): Promise<number | null> {
    const res = await prisma.orders.findFirst(
        {
            select: {
                id: true,
                internal_number: true,
            },
            orderBy: {
                internal_number: 'desc'
            },
            where: {
                NOT: {
                    internal_number: null
                }
            }
        }
    )
    if (res?.internal_number !== undefined && res?.internal_number !== null) {
        return res.internal_number
    }
    return null
}

async function getLatestOrderNumber(): Promise<number | null> {
    const res = await prisma.orders.findFirst(
        {
            select: {
                id: true,
                number: true,
            },
            orderBy: {
                number: 'desc'
            },
            where: {
                NOT: {
                    number: null
                }
            }
        }
    )
    if (res?.number !== undefined && res?.number !== null) {
        return res.number
    }
    return null
}

export async function updateOrder(id: number, order: Prisma.ordersUncheckedUpdateInput): Promise<void> {
    try {
        const res = await prisma.orders.update({
            where: { id: id },
            data: {
                total: order.total,
                customer_id: order.customer_id,
                timestamp: order.timestamp,
                type: order.type,
                void: order.void,
                paid: order.paid,
                subtotal: order.subtotal,
                gst: order.gst,
                discount: order.discount,
                internal: order.internal,
                internal_number: order.internal_number,
                number: order.number
            },
        })
        logInfo(updateOrder.name, `Order Updated: {id: ${res.id}, total: ${res.total}, customer_id: ${res.customer_id}, timestamp: ${res.timestamp}}, type: ${res.type}}`)
    } catch (err) {
        logError(updateOrder.name, `${err}`);
        throw new Error(`${err} `)
    }
}

export async function submitOrder(
    data: {
        customer_id: number,
        orderDetails: { type: number, internal: boolean },
        items: {
            [key: string]: {
                node: {
                    id: number;
                    menu_id: number;
                    price: number;
                    name_eng: string;
                    name_chn: string;
                    category: number;
                    custom_id: string,
                    custom_name: string,
                }
                quantity: number,
                timestamp: Date,
                customizations: { name_eng: string, name_chn: string }[]
            }

        }
        priceDetails: { subtotal: number, gst: number, total: number, discount: number }
    }) {
    try {
        const newOrder = await createOrder({ total: 0, customer_id: data.customer_id, type: data.orderDetails.type, internal: data.orderDetails.internal });
        const itemsArray = createOrdersItemsCreateManyInputData(newOrder.id, data.items)
        await createOrdersItemsBulk(itemsArray);
        await updateOrder(newOrder.id, data.priceDetails) // update price details
        await createAndPrintOrderBill({ order_id: newOrder.id, printKitchen: true, printClient: true });
    } catch (err) {
        console.log(err)
        throw err
    }
}

function createOrdersItemsCreateManyInputData(order_id: number, items: {
    [key: string]: {
        node: {
            id: number;
            menu_id: number;
            price: number;
            name_eng: string;
            name_chn: string;
            category: number;
            custom_id: string,
            custom_name: string,
        }
        quantity: number,
        timestamp: Date,
        customizations: { name_eng: string, name_chn: string }[]
    }
}): {
    order_id: any; item_id: any; quantity: any; customizations: any; timestamp: string; price: any; custom_name: any
}[] {
    const ordersItemsCreateManyInputData = [];
    for (const value of Object.entries(items)) {
        const item = value[1];
        ordersItemsCreateManyInputData.push({
            order_id: order_id,
            item_id: item.node.id,
            quantity: item.quantity,
            customizations: item.customizations ? item.customizations : undefined,
            timestamp: new Date(item.timestamp).toISOString(),
            price: item.node.price,
            custom_name: item.node.custom_name,
        });
    }
    return ordersItemsCreateManyInputData;
}

export async function modifyOrder(
    data: {
        customer_id: number,
        // order_details: { id: number, type: number, internal: boolean },
        orderDetails: {id: number,  type: number, number: number | null, internal: boolean, internal_number: number | null},
        items: {
            [key: string]: {
                node: {
                    id: number;
                    menu_id: number;
                    price: number;
                    name_eng: string;
                    name_chn: string;
                    category: number;
                    custom_id: string,
                    custom_name: string,
                }
                quantity: number,
                timestamp: Date,
                customizations: { name_eng: string, name_chn: string }[]
            }
        }
        priceDetails: { subtotal: number, gst: number, total: number, discount: number }
    }) {
        console.log(data.orderDetails)
    try {
        await deleteAllOrdersItemsWithOrderId(data.orderDetails.id);
        const itemsArray = createOrdersItemsCreateManyInputData(data.orderDetails.id, data.items)
        await createOrdersItemsBulk(itemsArray);

        let latestOrderNumberToInsert = data.orderDetails.number;
        let latestInternalOrderNumberToInsert = data.orderDetails.internal_number;
        let voidOrder = false;

        if (data.orderDetails.internal === false && data.orderDetails.internal_number !== null) {
            const latestOrderNumber = await getLatestOrderNumber();
            latestOrderNumberToInsert = latestOrderNumber !== null ? latestOrderNumber + 1 : 1;
            latestInternalOrderNumberToInsert = null;
            await createAndPrintOrderBill({ order_id: data.orderDetails.id, printClient: true, printKitchen: false, voided: true })
            voidOrder = true;
            await submitOrder(data)
        }

        if (data.orderDetails.internal === true && data.orderDetails.internal_number === null) {
            const latestInternalOrderNumber = await getLatestInternalOrderNumber();
            latestInternalOrderNumberToInsert = latestInternalOrderNumber !== null ? latestInternalOrderNumber + 1 : 1;
            latestOrderNumberToInsert = null;
            await createAndPrintOrderBill({ order_id: data.orderDetails.id, printClient: true, printKitchen: false, voided: true })
            voidOrder = true;
            await submitOrder(data)

        }

        // await updateOrder(data.order.id, { ...data.priceDetails, type: data.type, customer_id: data.customer_id, internal: data.order.internal, internal_number: latestInternalOrderNumberToInsert, number: latestOrderNumberToInsert }) // update price details

        await updateOrder(data.orderDetails.id, { ...data.priceDetails, type: data.orderDetails.type, customer_id: data.customer_id, void: voidOrder }) // update price details
        if (!voidOrder) {
            await createAndPrintOrderBill({ order_id: data.orderDetails.id, printKitchen: true, printClient: true });
        } 
    } catch (err) {
        console.log(err)
        throw err
    }
}
