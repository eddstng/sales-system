import express from 'express';
import bodyParser from 'body-parser';

import { PrismaClient } from "@prisma/client"
import { getAllItems, createItem } from './handlers/items/items';

export default function startServer(prisma: PrismaClient): void {
    const port = 3000
    const app = express()

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/get/items/all', async (_req, res) => {
        res.json(await getAllItems(prisma))
    })
    app.post('/post/items/create', async (req, res) => {
        res.json(await createItem(prisma, req.body))
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}