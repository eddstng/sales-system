import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { getAllItems, createItem, getOneItem, deleteOneItem, updateItem } from './repositories/items/items';
import { logger } from '../src/logging/logger';
import { Prisma } from '@prisma/client';
import { getAllCustomers, getOneCustomer, createCustomer, updateCustomer, deleteOneCustomer } from './repositories/customers/customers';
import { createOrder, deleteOneOrder, submitOrder, getAllOrders, getOneOrder, modifyOrder, updateOrder, getAllOrdersWithCustomerId } from './repositories/orders/orders';
import { getAllOrdersItems, createOrdersItems, updateOrdersItems, deleteOneOrdersItems, getOneOrdersItems, createOrdersItemsBulk, deleteAllOrdersItemsWithOrderId } from './repositories/ordersItems/ordersItems';
import { getAllOrdersHistory } from './repositories/ordersHistory/ordersHistory';
import { getAllOrdersItemsDetail, getAllOrdersItemsDetailWithOrderId } from './repositories/ordersItemsDetail/ordersItemsDetail';
import { createAndPrintOrderBill, reprintOrder } from './repositories/printOrder/printOrder';
import { logInfo } from './logging/utils';
import { createAndPrintHistoryStatement } from './repositories/printHistory/printHistory';

export default function startServer(): void {
    const port = 3000
    const app = express()
    app.use(cors())

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/get/server', async (_req, res) => {
        try {
            res.status(200).json(true)
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    // Items
    app.get('/get/items/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllItems())
            logInfo('clientConnected', `Success!`)
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.get('/get/items/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneItem(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.post('/post/items/create', async (req, res) => {
        try {
            res.status(200).json(await createItem(req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.put('/put/items/update/id/:id', async (req, res) => {
        try {
            res.status(200).json(await updateItem(parseInt(req.params.id), <Prisma.itemsUpdateInput>req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.delete('/delete/items/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneItem(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    // Customers
    app.get('/get/customers/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllCustomers())
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.get('/get/customers/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneCustomer(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.post('/post/customers/create', async (req, res) => {
        try {
            res.status(200).json(await createCustomer(req.body))
        } catch (err: unknown) {
            const error = err as string
            res.status(500).send(`${err as string}`);
        }
    })
    app.put('/put/customers/update/id/:id', async (req, res) => {
        try {
            const updatedCustomerDetails = await updateCustomer(parseInt(req.params.id), <Prisma.customersUpdateInput>req.body)
            res.status(200).json(updatedCustomerDetails)
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.delete('/delete/customers/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneCustomer(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    // Orders
    app.get('/get/orders/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllOrders())
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.get('/get/orders/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneOrder(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.get('/get/customerorders/customerid/:id', async (req, res) => {
        try {
            res.status(200).json(await getAllOrdersWithCustomerId(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.post('/post/orders/create', async (req, res) => {
        try {
            res.status(200).json(await createOrder(req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.put('/put/orders/update/id/:id', async (req, res) => {
        try {
            res.status(200).json(await updateOrder(parseInt(req.params.id), <Prisma.ordersUpdateInput>req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.delete('/delete/orders/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneOrder(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    // OrdersItem
    app.get('/get/ordersitems/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllOrdersItems())
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.get('/get/ordersitems/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneOrdersItems(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.post('/post/ordersitems/create', async (req, res) => {
        try {
            res.status(200).json(await createOrdersItems(req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.post('/post/ordersitems/create/bulk', async (req, res) => {
        try {
            // console.log('===============/post/ordersitems/create/bulk-req.body-START')
            // console.log(req.body)
            // console.log('===============/post/ordersitems/create/bulk-req.body-END')
            res.status(200).json(await createOrdersItemsBulk(req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.put('/put/ordersitems/update/id/:id', async (req, res) => {
        try {
            res.status(200).json(await updateOrdersItems(parseInt(req.params.id), <Prisma.orders_itemsUncheckedUpdateInput>req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    app.delete('/delete/ordersitems/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneOrdersItems(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    app.delete('/delete/ordersitems/delete/all/order_id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteAllOrdersItemsWithOrderId(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).json({error: `${err as string}`, })
            res.status(500).send(`${err as string}`);
        }
    })

    // OrdersItem
    app.get('/get/ordershistory/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllOrdersHistory())
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    // OrdersItemsDetail
    app.get('/get/ordersitemsdetail/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllOrdersItemsDetail())
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    app.get('/get/ordersitemsdetail/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getAllOrdersItemsDetailWithOrderId(parseInt(req.params.id)))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    app.post('/post/print', async (req, res) => {
        try {
            await createAndPrintOrderBill(req.body)
            res.status(200)
        } catch (err: unknown) {
            const resError = err as {message: string}
            console.log((resError))
            res.status(500).json({error: resError.message})
        }
    })

    app.post('/post/reprint', async (req, res) => {
        try {
            await reprintOrder(req.body)
            res.status(200)
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    app.post('/post/submitorder', async (req, res) => {
        try {
            res.status(200).json(await submitOrder(req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    app.post('/post/modifyorder', async (req, res) => {
        try {
            res.status(200).json(await modifyOrder(req.body))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    app.get('/get/todayhistorystatement', async (req, res) => {
        try {
            await createAndPrintHistoryStatement()
            res.status(200)
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })


    app.get('/get/todayhistorystatementinternal', async (req, res) => {
        try {
            await createAndPrintHistoryStatement({internal: true})
            res.status(200)
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })

    app.post('/post/todayhistorystatementtype', async (req, res) => {
        try {
            res.status(200).json(await createAndPrintHistoryStatement({type: req.body.type}))
        } catch (err: unknown) {
            res.status(500).send(`${err as string}`);
        }
    })
    
    app.listen(port, () => {
        logger.info('[server] Server started on http://localhost:3000.')
    })
}
