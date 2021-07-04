import { prisma, orders, Prisma } from "@prisma/client";
import { IsNotEmpty } from "class-validator";
import { logInfo, logError } from "../logging/utils";
import { Item } from "../repositories/items/items";
import { createOrder } from "../repositories/orders/orders";
import { createOrderItem } from "../repositories/order_items/orderItems";
import { validateClassFields } from "../repositories/utils";

export class ItemInput extends Item {
    size?: number | undefined;
    price?: number | undefined;
    option?: string | undefined;
}

export async function createOrderWithItems(
    customer_id: number, items: ItemInput[]
): Promise<Record<string, unknown>[]> {
    let totalPrice = 0;
    try {
        const createOrderRes = await createOrder(JSON.parse(`{"customer_id": "${customer_id}")}`))
        items.forEach(async (item) => {
            totalPrice = totalPrice + (item.price ?? item.price_0);
            await createOrderItem(
                JSON.parse(
                    `{"item_id": "${item.id}", "order_id": "${createOrderRes.id}")}`
                )
            )
        })
       
    } catch (err) {
        logInfo(getAllOrders.name, `[✗] Error: ${err}`)
        throw new Error(`${err}`)
    }
}

