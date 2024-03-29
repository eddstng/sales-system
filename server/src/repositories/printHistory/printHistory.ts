import { prisma } from '../../app'
import { logError, logInfo, logWarn } from '../../logging/utils'
import { thermalPrinterInterface } from '../../app';
import * as dotenv from 'dotenv';
import { orders_history } from '@prisma/client';

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

export async function createAndPrintHistoryStatement(options?: { internal?: boolean, type?: number }) {
    thermalPrinterSetup()
    if (printer !== undefined) {
        printer.clear()
    }

    const historyToPrint = await getHistoryToPrint(options)
    if (historyToPrint.length === 0) {
        throw new Error('No history to print.')
    }
    const historyStatementPath = createHistoryStatement(historyToPrint, options)
    if (process.env.PRINTING !== 'false') {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        await delay(10)
        await printer.printImage(historyStatementPath);
        printer.cut();
        printer.execute();
    } else {
        throw new Error('Printing is turned off. Turn printing setting on to print history statement.')
    }
}

function createHistoryStatement(history: orders_history[], options?: { internal?: boolean, type?: number }) {
    if (history.length === 0) {
        throw new Error('empty');
    }
    let startTimestamp = `${history[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} ${history[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`
    let endTimestamp = `${history[history.length - 1].order_timestamp?.toLocaleDateString("zh-Hans-CN")} ${history[history.length - 1].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`

    if (startTimestamp.length === 18) {
        startTimestamp = `\xa0`.repeat(2) + startTimestamp
    }
    if (startTimestamp.length === 17) {
        startTimestamp = `\xa0`.repeat(4) + startTimestamp
    }
    if (endTimestamp.length === 18) {
        endTimestamp = `\xa0`.repeat(2) + endTimestamp
    }
    if (endTimestamp.length === 17) {
        endTimestamp = `\xa0`.repeat(4) + endTimestamp
    }

    let historyStatementString = `HISTORY STATEMENT${`\xa0`.repeat(12)}\n-------------------------------------------------\nSTART: ${startTimestamp}${`\xa0`.repeat(7)}\nEND: ${endTimestamp}${`\xa0`.repeat(7)}\n-------------------------------------------------`;

    let historyStatementTypeString = ''
    if (options?.internal === true) {
        historyStatementTypeString = `INTERNAL${`\xa0`.repeat(23)}\n` 
    }
    if (options?.type === 2) {
        historyStatementTypeString = `DELIVERY${`\xa0`.repeat(23)}\n` 
    }
    historyStatementString = `${historyStatementTypeString}` + historyStatementString
    historyStatementString += `\nID${`\xa0`.repeat(12)}TIMESTAMP${`\xa0`.repeat(11)}PRICE${`\xa0`.repeat(0)}`

    let historyStatementTotal = 0
    history.forEach((element: orders_history) => {
        let formattedOrderTotal = `${Number(element.order_total).toFixed(2)}`;
        if (Number(element.order_total).toFixed(2).length === 4) {
            formattedOrderTotal = `${`\xa0`.repeat(6)}${Number(element.order_total).toFixed(2)}`
        }
        if (Number(element.order_total).toFixed(2).length === 5) {
            formattedOrderTotal = `${`\xa0`.repeat(4)}${Number(element.order_total).toFixed(2)}`
        }
        if (Number(element.order_total).toFixed(2).length === 6) {
            formattedOrderTotal = `${`\xa0`.repeat(2)}${Number(element.order_total).toFixed(2)}`
        }
        let elementTimestamp = `${element.order_timestamp?.toLocaleDateString("zh-Hans-CN")} ${element.order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}`

        if (elementTimestamp.length === 17) {
            elementTimestamp = `\xa0`.repeat(7) + elementTimestamp
        }
        if (elementTimestamp.length === 18) {
            elementTimestamp = `\xa0`.repeat(5) + elementTimestamp
        }
        if (elementTimestamp.length === 19) {
            elementTimestamp = `\xa0`.repeat(3) + elementTimestamp
        }
        historyStatementString += `\n ${element.order_number ?? 'I-' + element.order_internal_number} ${elementTimestamp} ${`\xa0`.repeat(2)}${element.order_void ? `${`\xa0`.repeat(5)}VOID` : formattedOrderTotal}`
        if (Number(element.order_total) === null) {
            throw new Error('total is null')
        }
        if (element.order_void !== true) {
            historyStatementTotal += Number(element.order_total)
        }
    })
    let totalSpacing = `\xa0`.repeat(35)
    if (`${historyStatementTotal.toFixed(2)}`.length === 5) {
        totalSpacing = `\xa0`.repeat(39)
    }
    if (`${historyStatementTotal.toFixed(2)}`.length === 6) {
        totalSpacing = `\xa0`.repeat(37)
    }
    if (`${historyStatementTotal.toFixed(2)}`.length === 7) {
        totalSpacing = `\xa0`.repeat(35)
    }
    if (`${historyStatementTotal.toFixed(2)}`.length === 8) {
        totalSpacing = `\xa0`.repeat(32)
    }
    historyStatementString += `\n-------------------------------------------------\n TOTAL${totalSpacing} ${historyStatementTotal.toFixed(2)}`

    const textToImage = require('text-to-image');

    const historyStatementImageURI = textToImage.generateSync(
        historyStatementString,
        { fontSize: 30, lineHeight: 55, margin: 30, maxWidth: 550, textAlign: 'right' });
    let historyStatementPath = `./src/repositories/printHistory/statements/${history[history.length - 1].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${history[history.length - 1].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}.png`;
    const imageDataURI = require('image-data-uri');
    imageDataURI.outputFile(historyStatementImageURI, historyStatementPath)
    return historyStatementPath
}

export async function getHistoryToPrint(options?: { internal?: boolean, type?: number }): Promise<orders_history[]> {
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

        const res = options?.type ? await prisma.orders_history.findMany(
            {
                where: {
                    order_timestamp: {
                        gte: gteDate,
                        lte: lteDate
                    },
                    order_internal: options?.internal ? true : false,
                    order_type: options.type
                },
                orderBy: {
                    order_id: 'asc'
                }
            }
        ) : await prisma.orders_history.findMany(
            {
                where: {
                    order_timestamp: {
                        gte: gteDate,
                        lte: lteDate
                    },
                    order_internal: options?.internal ? true : false,
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
