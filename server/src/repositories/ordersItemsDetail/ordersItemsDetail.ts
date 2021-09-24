import { prisma } from '../../app'
import { logInfo } from '../../logging/utils'

export async function getOrdersItemsDetail(): Promise<Record<string, unknown>[]> {
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
        logInfo(getOrdersItemsDetail.name, `[✓]`)
        return allOrdersHistory;
    } catch (err) {
        logInfo(getOrdersItemsDetail.name, `[✗] ${err}`)
        throw err;
    }
}