import { prisma } from '../../app'
import { logInfo } from '../../logging/utils'

export async function getAllOrdersItemsDetail(): Promise<Record<string, unknown>[]> {
    try {
        const allOrdersHistory = await prisma.orders_items_detail.findMany(
            {
                orderBy: [
                    {
                        order_id: 'desc',
                    },
                ]
            }
        )
        logInfo(getAllOrdersItemsDetail.name, `[✓]`)
        return allOrdersHistory;
    } catch (err) {
        logInfo(getAllOrdersItemsDetail.name, `[✗] ${err}`)
        throw err;
    }
}

export async function getAllOrdersItemsDetailWithOrderId(order_id: number): Promise<Record<string, unknown>[]> {
    try {
        const allOrdersHistoryWithOrderId = await prisma.orders_items_detail.findMany(
            {
                orderBy: [
                    {
                        order_id: 'desc',
                    },
                ],
                where: {
                    order_id
                }
            }
        )
        logInfo(getAllOrdersItemsDetailWithOrderId.name, `[✓]`)
        console.log('===========allOrdersHistoryWithOrderId-START')
        console.log(allOrdersHistoryWithOrderId)
        console.log('===========allOrdersHistoryWithOrderId-END')
        return allOrdersHistoryWithOrderId;
    } catch (err) {
        logInfo(getAllOrdersItemsDetailWithOrderId.name, `[✗] ${err}`)
        throw err;
    }
}