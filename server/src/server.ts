import express from 'express';
import bodyParser from 'body-parser';

import { getAllItems, createItem, getOneItem, deleteOneItem, updateItem } from './handlers/items/items';
import { logger } from '../src/logging/logger';
import { Prisma } from '@prisma/client';
import { getAllCustomers, getOneCustomer, createCustomer, updateCustomer, deleteOneCustomer } from './handlers/customers/customers';
import { createOrder, deleteOneOrder, getAllOrders, getOneOrder, updateOrder } from './handlers/orders/orders';
import { getAllOrderItem, createOrderItem, updateOrderItem, deleteOneOrderItem, getOneOrderItem } from './handlers/order_items/orderItems';

export default function startServer(): void {
    const port = 3000
    const app = express()

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Items
    app.get('/get/items/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllItems())
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.get('/get/items/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneItem(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.post('/post/items/create', async (req, res) => {
        try {
            res.status(200).json(await createItem(req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.put('/put/items/update/id/:id', async (req, res) => {
        try {
            res.status(200).json(await updateItem(parseInt(req.params.id), <Prisma.itemsUpdateInput>req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.delete('/delete/items/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneItem(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })

    // Customers
    app.get('/get/customers/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllCustomers())
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.get('/get/customers/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneCustomer(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.post('/post/customers/create', async (req, res) => {
        try {
            res.status(200).json(await createCustomer(req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.put('/put/customers/update/id/:id', async (req, res) => {
        try {
            res.status(200).json(await updateCustomer(parseInt(req.params.id), <Prisma.customersUpdateInput>req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.delete('/delete/customers/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneCustomer(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })

    // Orders
    app.get('/get/orders/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllOrders())
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.get('/get/orders/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneOrder(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.post('/post/orders/create', async (req, res) => {
        try {
            res.status(200).json(await createOrder(req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.put('/put/orders/update/id/:id', async (req, res) => {
        try {
            res.status(200).json(await updateOrder(parseInt(req.params.id), <Prisma.ordersUpdateInput>req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.delete('/delete/orders/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneOrder(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })

    // OrdersItem
    app.get('/get/orderitems/all', async (_req, res) => {
        try {
            res.status(200).json(await getAllOrderItem())
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.get('/get/orderitems/id/:id', async (req, res) => {
        try {
            res.status(200).json(await getOneOrderItem(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.post('/post/orderitems/create', async (req, res) => {
        try {
            res.status(200).json(await createOrderItem(req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.put('/put/orderitems/update/id/:id', async (req, res) => {
        try {
            res.status(200).json(await updateOrderItem(parseInt(req.params.id), <Prisma.orders_itemsUncheckedUpdateInput>req.body))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })
    app.delete('/delete/orderitems/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneOrderItem(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })

    app.listen(port, () => {
        logger.info('[server] Server started on http://localhost:3000.')
    })
}
