import express from 'express';
import bodyParser from 'body-parser';

export default function startServer(): void {
    const port = 3000

    const app = express()
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.get('/', (req, res) => {
        res.send('200')
    })
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}