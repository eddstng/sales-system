import { prisma } from '../../app'
import { logError, logInfo, logWarn } from '../../logging/utils'
import { thermalPrinterInterface } from '../../app';
import * as dotenv from 'dotenv';
import { orders, orders_history, orders_items_detail } from '@prisma/client';
import { deleteOneOrder } from '../orders/orders';
import { deleteAllOrdersItemsWithOrderId } from '../ordersItems/ordersItems';

dotenv.config();
const ThermalPrinter = require('node-thermal-printer').printer
const Types = require('node-thermal-printer').types
const english = /^[A-Za-z\d_-]+$/;

// See if we can move this to be initialized at app.ts
let printer: any;

function thermalPrinterSetup(): any {
    if (process.env.PRINTING !== 'true') {
        logInfo(thermalPrinterSetup.name, 'Printing is set to false in env. Printer will not be initialized.')
        return
    }
    if (printer === undefined) {
        printer = new ThermalPrinter({
            type: Types.EPSON,
            interface: thermalPrinterInterface,
        });
    }
}

export async function createAndPrintHistoryStatement(
) {
    thermalPrinterSetup()
    if (printer !== undefined) {
        printer.clear()
    }

    // get all order_history from today (later we can set a given date and time)
    const historyToPrint = await getHistoryToPrint()
    console.log(historyToPrint)
    const historyStatementPath = createHistoryStatement(historyToPrint)
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    await delay(10)
    await printer.printImage(historyStatementPath);
    printer.cut();
    printer.execute();
}

function createHistoryStatement(history: orders_history[]) {
    if (history.length === 0) {
        throw new Error('empty');
    }
    let timestampOfHistoryStatementCreationString = `${history[history.length - 1].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${history[history.length - 1].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`
    // let timestampOfHistoryStatementCreationString = `${new Date().toLocaleDateString("zh-Hans-CN")} - ${new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`
    let startTimestamp = `${history[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${history[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`
    let endTimestamp = `${history[history.length - 1].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${history[history.length - 1].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`

    let historyStatementString = `HISTORY STATEMENT${`\xa0`.repeat(12)}\n-------------------------------------------------\nSTART: ${`\xa0`.repeat(2)}${startTimestamp}${`\xa0`.repeat(7)}\nEND:${`\xa0`.repeat(3)}${endTimestamp}${`\xa0`.repeat(7)}\n-------------------------------------------------`;

    let historyStatementTotal = 0
    history.forEach((element: orders_history) => {
        let formattedOrderTotal = `${element.order_total?.toFixed(2)}`;
        if (element.order_total?.toFixed(2).length === 4) {
            formattedOrderTotal = `${`\xa0`.repeat(6)}${element.order_total?.toFixed(2)}`
        }
        if (element.order_total?.toFixed(2).length === 5) {
            formattedOrderTotal = `${`\xa0`.repeat(4)}${element.order_total?.toFixed(2)}`
        }
        if (element.order_total?.toFixed(2).length === 6) {
            formattedOrderTotal = `${`\xa0`.repeat(2)}${element.order_total?.toFixed(2)}`
        }
        historyStatementString += `\n ${element.order_id} ${`\xa0`.repeat(4)} ${element.order_timestamp?.toLocaleDateString("zh-Hans-CN")} ${element.order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })} ${`\xa0`.repeat(3)}${formattedOrderTotal}`
        if (element.order_total === null) {
            throw new Error('total is null')
        }
        historyStatementTotal += element.order_total
    })
    historyStatementString += `\n-------------------------------------------------\n TOTAL${`\xa0`.repeat(33)} ${historyStatementTotal.toFixed(2)}`

    const textToImage = require('text-to-image');

    const historyStatementImageURI = textToImage.generateSync(
        historyStatementString,
        { fontSize: 30, lineHeight: 55, margin: 30, maxWidth: 550, textAlign: 'right' });
    let historyStatementPath = `./src/repositories/printOrder/bills/${history[history.length - 1].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${history[history.length - 1].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}.png`;
    const imageDataURI = require('image-data-uri');
    imageDataURI.outputFile(historyStatementImageURI, historyStatementPath)
    return historyStatementPath
}

// async function getHistoryToPrint(order_id: number, retries: number, err?: unknown | undefined): Promise<orders_items_detail[]> {
export async function getHistoryToPrint(): Promise<orders_history[]> {
    try {
        var gteDate = new Date;
        gteDate.setHours(0);
        gteDate.setMinutes(0);
        gteDate.setSeconds(0);

        var lteDate = new Date;
        lteDate.setHours(0);
        lteDate.setMinutes(0);
        lteDate.setSeconds(0);
        lteDate.setDate(lteDate.getDate() + 1);
        const res = await prisma.orders_history.findMany(
            {
                where: {
                    order_timestamp: {
                        // gte: gteDate,
                        lte: lteDate
                    },
                },
                orderBy: {
                    order_id: 'asc'
                }
            }
        )
        return res
    } catch (err) {
        logError(getHistoryToPrint.name, `${err} `)
        throw err
    }
}
