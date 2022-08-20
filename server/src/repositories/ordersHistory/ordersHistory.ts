import { prisma } from '../../app'
import { logInfo } from '../../logging/utils'

export async function getAllOrdersHistory(): Promise<Record<string, unknown>[]> {
    try {
        const allOrdersHistory = await prisma.orders_history.findMany(
            {
                orderBy: [
                    {
                        order_id: 'desc',
                    },
                ]
            }
        )
        logInfo(getAllOrdersHistory.name, `Success!`)
        return allOrdersHistory;
    } catch (err) {
        logInfo(getAllOrdersHistory.name, `${err}`)
        throw err;
    }
}