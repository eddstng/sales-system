import { prisma } from '../../app'
import { logError, logInfo, logWarn } from '../../logging/utils'
import { thermalPrinterInterface } from '../../app';
import * as dotenv from 'dotenv';
import { orders, orders_items_detail } from '@prisma/client';
import { deleteOneOrder } from '../orders/orders';
import { deleteAllOrdersItemsWithOrderId } from '../ordersItems/ordersItems';

dotenv.config();
const ThermalPrinter = require('node-thermal-printer').printer
const Types = require('node-thermal-printer').types
const english = /^[a-zA-Z-0-9 ]*$/;
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

async function billSetup(
    printer: any,
    printObj: { order_id: number, printClient: boolean, printKitchen: boolean },
    kitchenAndClientBills: { clientBillPath: string, kitchenBillPath: string, isDelivery: boolean },
    reprint?: boolean
): Promise<void> {
    if (printObj.printKitchen) {
        await printer.printImage(kitchenAndClientBills.kitchenBillPath);
        printer.cut();
        if (reprint !== true) {
            await printer.printImage(kitchenAndClientBills.kitchenBillPath);
            printer.cut();
        }
    }
    if (printObj.printClient) {
        await printer.printImage('./src/repositories/printOrder/header.png');
        await printer.printImage(kitchenAndClientBills.clientBillPath);
        printer.cut();
    }
    if (kitchenAndClientBills.isDelivery) {
        await printer.printImage('./src/repositories/printOrder/header.png');
        await printer.printImage(kitchenAndClientBills.clientBillPath);
        printer.cut();
    }
}

async function handleFailure(order_id: number) {
    await deleteAllOrdersItemsWithOrderId(order_id)
    await deleteOneOrder(order_id)
    // once deleted the order will skip the deleted id. need to add a column called order_number and then use that instead of order_id. 
    const error = new Error(`An error occured while attempting to create and print bill. Order with order_id ${order_id} has been deleted.`)
    logError(createAndPrintOrderBill.name, new Error(`An error occured while attempting to create and print bill. Order creation has been cancelled. Order with order_id ${order_id} has been deleted.`))
    throw new Error(`An error occured while attempting to create and print bill. Order creation has been cancelled.`)
}

export async function createAndPrintOrderBill(printObj: { order_id: number, printClient: boolean, printKitchen: boolean, voided?: boolean }): Promise<void> {
    try {
        const kitchenAndClientBills = await createKitchenAndClientBill(printObj.order_id, printObj.voided)
        thermalPrinterSetup()
        if (printer !== undefined) {
            printer.clear()
        }

        if (process.env.PRINTING !== 'false') {
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
            await delay(20)
            await billSetup(printer, printObj, kitchenAndClientBills)
            if (printObj.printClient || printObj.printKitchen) {
                console.log('we are here')
                printer.execute();
            }
        }
        logInfo(createAndPrintOrderBill.name, `Success!`)
        return;
    } catch (err) {
        logError(createAndPrintOrderBill.name, `${err}`)
        await handleFailure(printObj.order_id);
    }

}

async function getOrderToPrint(order_id: number, retries: number, err?: unknown | undefined): Promise<orders_items_detail[]> {
    if (retries > 5 && err) {
        throw new Error(err as string)
    }
    if (retries > 0) {
        logWarn(getOrderToPrint.name, `Unable to print order due to error. Retry: ${retries}/5`)
    }
    try {
        // if (retries <= 6) {
        //     const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        //     await delay(1000)
        //     throw new Error('fake error')
        // }
        const res = await prisma.orders_items_detail.findMany(
            {
                where: {
                    order_id: order_id,
                }
            }
        )
        return res
    } catch (err) {
        if (retries === 0) {
            logWarn(getOrderToPrint.name, 'Unable to print order due to error. Attempting to retry...')
            logError(getOrderToPrint.name, `${err}`)
        } else {
            logError(getOrderToPrint.name, `${err}`)
        }
        return getOrderToPrint(order_id, retries + 1, err)
    }
}

// when repritning alert with notifications
export async function reprintOrder(printObj: { order_id: number, printClient: boolean, printKitchen: boolean, order_timestamp: Date }): Promise<void> {
    try {
        const orderTimestamp = new Date(printObj.order_timestamp)
        const timestampPath = `${orderTimestamp.toLocaleDateString("zh-Hans-CN")}`
        const kitchenAndClientBills = {
            clientBillPath: `./src/repositories/printOrder/bills/${timestampPath}/${printObj.order_id}-e.png`,
            kitchenBillPath: `./src/repositories/printOrder/bills/${timestampPath}/${printObj.order_id}-c.png`,
            isDelivery: false
        }
        thermalPrinterSetup()
        printer.clear()
        await billSetup(printer, printObj, kitchenAndClientBills, true)
        printer.execute()
    } catch (err) {
        logError(reprintOrder.name, `${err}`)
        const error = new Error(`Failed to reprint order bill.`)
        throw new Error(`An error occured while attempting to reprint order bill.`)
    }
}

export async function createKitchenAndClientBill(order_id: number, voided?: boolean): Promise<{ clientBillPath: string, kitchenBillPath: string, isDelivery: boolean }> {
    try {
        // This delay is required to temporarily fix the issue with incorrect printing after modifying an order. The database is not updating quick enough so the old order is printed.
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        await delay(100)
        const res = await getOrderToPrint(order_id, 0)
        let orderTypeString = 'PICK UP'
        if (res[0].order_type === 0) {
            orderTypeString = 'DINE IN'
        }
        if (res[0].order_type === 2) {
            orderTypeString = 'DELIVERY'
        }

        let kitchenBillString = `${res[0].order_number ?? `I-` + res[0].order_internal_number} \n\n\n ${orderTypeString}


        ${res[0].customer_phone}


        ` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
        \n總數: ${res[0].items_quantity_total}\n\n
        -----------------------

        `;

        const buzzerNumber = res[0].customer_buzzer_number ? `Buzzer: ${res[0].customer_buzzer_number} \n` : '';
        let clientBillString = `
        ${res[0].order_number ?? `I-` + res[0].order_internal_number} \n ${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${buzzerNumber}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
        -----------------------`;

        let kitchenBillStringEnglish = '';
        let prevItemNameChnWasEng = false; //used for formatting
        res.forEach((element: any) => {
            let kitchenCustomizationString: string = '';
            let kitchenBillStringItemNameChnDisplay = getKitchenBillStringItemNameChnDisplay(element.item_name_chn)
            if (element.orders_items_customizations !== null) {
                element.orders_items_customizations.forEach((customization: { name_eng: string, name_chn: string }) => {
                    if (english.test(element.item_name_chn)) { // To handle formatting for items such as Dinner Specials.
                        kitchenCustomizationString += `\n${`\xa0`.repeat(2)}⤷${customization.name_chn === '' ? '___________' : customization.name_chn}\n\n`
                    } else {
                        kitchenCustomizationString += `\n\n\n${`\xa0`.repeat(2)}⤷${customization.name_chn === '' ? '___________' : customization.name_chn}\n`
                    }
                })
            }

            if (element.item_name_chn.length === 0) {
                kitchenBillString += `\n\nx${element.orders_items_quantity} ____________${kitchenCustomizationString ? `\n\n${kitchenCustomizationString}` : ''}
                
                `
            } else {
                if (english.test(element.item_name_chn)) {
                    // kitchenBillString += `
                    //  x${element.orders_items_quantity} ${element.item_name_chn}
                    // ${kitchenCustomizationString}
                    // `
                    if (prevItemNameChnWasEng) {
                        kitchenBillStringEnglish += `\nx${element.orders_items_quantity} ${element.item_name_chn}
                        ${kitchenCustomizationString}\n
                        `
                    } else {
                        kitchenBillStringEnglish += `\n\nx${element.orders_items_quantity} ${element.item_name_chn}
                        ${kitchenCustomizationString}\n
                        `
                    }
                    prevItemNameChnWasEng = true;
                } else {
                    kitchenBillString += `
                    x${element.orders_items_quantity} ${kitchenBillStringItemNameChnDisplay}
                    ${kitchenCustomizationString}
                    
                    `
                    prevItemNameChnWasEng = false;
                }
            }

            // kitchenBillString += `
            // `
            let clientCustomizationString: string = '';
            if (element.orders_items_customizations !== null) {
                element.orders_items_customizations.forEach((element: { name_eng: string, name_chn: string }) => {
                    if (element.name_chn === '') {
                        clientCustomizationString += `\n${`\xa0`.repeat(2)}⤷${element.name_eng}`
                    } else {
                        clientCustomizationString += `\n${`\xa0`.repeat(2)}⤷${element.name_chn}\n${`\xa0`.repeat(6)}${element.name_eng}`
                    }
                })
            }

            let itemPrice = `${element.item_custom_price ? (Number(element.item_custom_price as number)).toFixed(2) : (Number(element.item_price as number)).toFixed(2)}`
            clientBillString += `
            ${element.item_name_chn.length !== 0 ? `${element.orders_items_quantity}x  ${itemPrice} - ${element.item_name_chn}` : `${element.orders_items_quantity}x  ${itemPrice} - Custom Item`}
            ${`\xa0`.repeat(5)}${element.item_name_chn.length !== 0 ? '' : '⊵'}${element.item_name_eng}${clientCustomizationString ? clientCustomizationString : ''}`
        })

        kitchenBillString += `${kitchenBillStringEnglish}

        `

        clientBillString += `
        -----------------------
        Number of Items: ${res[0].items_quantity_total}
        Subtotal: $${(Number(res[0].order_subtotal)).toFixed(2)}` +
            `${Number(res[0].order_discount) !== 0 ? `
        Discount: -$${(Number(res[0].order_discount)).toFixed(2)}` : ''}` + `
        GST: $${(Number(res[0].order_gst)).toFixed(2)}
        Total: $${res[0].order_total.toFixed(2)}
        `

        if (voided) {
            clientBillString = `${`\xa0`.repeat(3)}VOID VOID VOID VOID\n` + clientBillString + `\n${`\xa0`.repeat(3)}VOID VOID VOID VOID`
        }

        const textToImage = require('text-to-image');

        const kitchenBillImageURI = textToImage.generateSync(
            kitchenBillString,
            { fontSize: 55, lineHeight: 20, maxWidth: 600 });

        const clientBillImageURI = textToImage.generateSync(
            clientBillString,
            { fontSize: 35, lineHeight: 43, margin: 35, maxWidth: 600 });

        // Consideration: Need to consider whether to save the file with order_number or order_id.

        let kitchenBillPath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-c.png`;
        let clientBillPath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-e${voided ? '-void' : ''}.png`;

        const imageDataURI = require('image-data-uri');
        imageDataURI.outputFile(kitchenBillImageURI, kitchenBillPath)
        imageDataURI.outputFile(clientBillImageURI, clientBillPath)
        logInfo(createKitchenAndClientBill.name, `Success!`)
        return { clientBillPath, kitchenBillPath, isDelivery: res[0].order_type === 2 };
    } catch (err) {
        logError(createKitchenAndClientBill.name, `${err}`)
        throw err;
    }

    function isNoodleTypeBracket(bracket: string) {
        switch (bracket) {
            case '(干)':
                return true
            case '(湿)':
                return true
            case '(軟)':
                return true
            default:
                return false
        }
    }

    function isSizeBracket(bracket: string) {
        switch (bracket) {
            case '(小)':
                return true
            case '(大)':
                return true
            default:
                return false
        }
    }

    function getKitchenBillStringItemNameChnDisplay(itemNameChn: string) {
        if (itemNameChn.slice(-1) === ')') {
            const indexOfOpenBracket = itemNameChn.lastIndexOf('(');
            if (isNoodleTypeBracket(itemNameChn.substring(indexOfOpenBracket))) {
                return (` ${itemNameChn.substring(indexOfOpenBracket)} ${itemNameChn.replace(itemNameChn.substring(indexOfOpenBracket), '')}`)
            }

            if (isSizeBracket(itemNameChn.substring(indexOfOpenBracket))) {
                return (`${itemNameChn.replace(itemNameChn.substring(indexOfOpenBracket), '')} ${itemNameChn.substring(indexOfOpenBracket)}`)
            }

            if (english.test((itemNameChn.substring(indexOfOpenBracket)).charAt(1))) {
                return (`${itemNameChn.replace(itemNameChn.substring(indexOfOpenBracket), '')}\n\n\n\n\n${`\xa0`.repeat(2)}⤷${itemNameChn.substring(indexOfOpenBracket)}`)
            }

            return (`${itemNameChn.replace(itemNameChn.substring(indexOfOpenBracket), '')}\n\n\n\n${`\xa0`.repeat(2)}⤷${itemNameChn.substring(indexOfOpenBracket)}`)
        }
        return itemNameChn
    }
}