import express from 'express';
import bodyParser from 'body-parser';

import { getAllItems, createItem, getOneItem, deleteOneItem } from './handlers/items/items';
import { logger } from '../src/logging/logger';

export default function startServer(): void {
    const port = 3000
    const app = express()

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

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
    app.delete('/delete/items/delete/id/:id', async (req, res) => {
        try {
            res.status(200).json(await deleteOneItem(parseInt(req.params.id)))
        } catch (err) {
            res.status(500).send({ error: err.toString() });
        }
    })

    app.listen(port, () => {
        logger.info('Server started on http://localhost:3000.')
    })
}