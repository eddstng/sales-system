import { prisma } from '../../app'
import { logError, logInfo, logWarn } from '../../logging/utils'
import { thermalPrinterInterface } from '../../app';
import * as dotenv from 'dotenv';
import { orders_items_detail } from '@prisma/client';
import { logger } from '../../logging/logger';

dotenv.config();
const ThermalPrinter = require('node-thermal-printer').printer
const Types = require('node-thermal-printer').types
const english = /^[A-Za-z\d_-]+$/;
let printer: any;

function thermalPrinterSetup(): any {
    if (process.env.PRINTING !== 'true') {
        logInfo(thermalPrinterSetup.name, 'Printing is set to false in env. Printer will not be initialized.')
        return
    }
    if (printer === undefined) {
        console.log('PRINTER INITIALIZED')
        printer = new ThermalPrinter({
            type: Types.EPSON,
            interface: thermalPrinterInterface,
        });
    }
}

async function billSetup(
    printer: any,
    printObj: { order_id: number, printClient: boolean, printKitchen: boolean },
    kitchenAndClientBills: { clientBillPath: string, kitchenBillPath: string, isDelivery: boolean }
): Promise<void> {
    if (printObj.printKitchen) {
        await printer.printImage(kitchenAndClientBills.kitchenBillPath);
        printer.cut();
        await printer.printImage(kitchenAndClientBills.kitchenBillPath);
        printer.cut();
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

export async function createAndPrintOrderBill(printObj: { order_id: number, printClient: boolean, printKitchen: boolean }): Promise<void> {
    try {
        const kitchenAndClientBills = await createKitchenAndClientBill(printObj.order_id)
        thermalPrinterSetup()
        if (printer !== undefined) {
            printer.clear()
        }
        // The delay is required to give time for the image to save. 
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        await delay(10)
        if (process.env.PRINTING !== 'false') {
            await billSetup(printer, printObj, kitchenAndClientBills)
            printer.execute();
        }
        logInfo(createAndPrintOrderBill.name, `Success`)
        return;
    } catch (err) {
        logError(createAndPrintOrderBill.name, `${err}`)
        throw err;
    }

}

// Hoping that this fixes the order_subtotal null issue.
async function getOrderToPrint(order_id: number, retries: number, err?: unknown | undefined): Promise<orders_items_detail[]> {
    if (retries > 3 && err) {
        throw new Error(err as string)
    }
    if (retries > 0) {
        logWarn(getOrderToPrint.name, `Unable to print order due to error. Retry: ${retries}/3`)
    }
    try {
        // if (retries <= 3) {
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

export async function createKitchenAndClientBill(order_id: number): Promise<{ clientBillPath: string, kitchenBillPath: string, isDelivery: boolean }> {
    try {
        const res = await getOrderToPrint(order_id, 0)
        let orderTypeString = 'PICK UP'
        if (res[0].order_type === 0) {
            orderTypeString = 'DINE IN'
        }
        if (res[0].order_type === 2) {
            orderTypeString = 'DELIVERY'
        }

        let kitchenBillString = `${res[0].order_id} \n\n\n ${orderTypeString}


        ${res[0].customer_phone}


        ` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
        \n總數: ${res[0].items_quantity_total}\n\n
        -----------------------
        

        `;

        const buzzerNumber = res[0].customer_buzzer_number ? `Buzzer: ${res[0].customer_buzzer_number} \n` : '';
        let clientBillString = `
        ${res[0].order_id} \n ${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${buzzerNumber}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
        -----------------------`;

        res.forEach((element: any) => {
            let kitchenCustomizationString: string = '';
            if (element.orders_items_customizations !== null) {
                element.orders_items_customizations.forEach((customization: { name_eng: string, name_chn: string }) => {
                    if (english.test(element.item_name_chn)) { // To handle formatting for items such as Dinner Specials.
                        kitchenCustomizationString += `\n⤷${customization.name_chn === '' ? '___________' : customization.name_chn}\n\n\n`
                    } else {
                        kitchenCustomizationString += `\n\n\n⤷${customization.name_chn === '' ? '___________' : customization.name_chn}\n`
                    }
                })
            }


            if (process.env.CUSTOM_ITEM_ID && element.item_id === parseInt(process.env.CUSTOM_ITEM_ID)) {
                kitchenBillString += `

                x${element.orders_items_quantity}${kitchenCustomizationString ? kitchenCustomizationString : ''} ⊵____________
                
                `

            } else {
                if (english.test(element.item_name_chn)) {
                    kitchenBillString += `
                     x${element.orders_items_quantity} ${element.item_name_chn}
                    ${kitchenCustomizationString}`
                } else {
                    kitchenBillString += `x${element.orders_items_quantity} ${element.item_name_chn}
                    ${kitchenCustomizationString}

                    `
                }
            }

            kitchenBillString += `
            `
            let clientCustomizationString: string = '';
            if (element.orders_items_customizations !== null) {
                element.orders_items_customizations.forEach((element: { name_eng: string, name_chn: string }) => {
                    if (english.test(element.name_eng)) {
                        clientCustomizationString += `\n⤷${element.name_eng}`
                    } else {
                        clientCustomizationString += `\n⤷${element.name_chn}/${element.name_eng}`
                    }
                })
            }

            clientBillString += `
            ${element.item_name_chn === 'Custom Item' ? `⊵${element.item_name_chn}` : element.item_name_chn}
            ${element.item_name_chn === 'Custom Item' ? `${element.item_custom_name}` : element.item_name_eng}${clientCustomizationString ? clientCustomizationString : ''}
            ${element.orders_items_quantity}x ${(element.item_price as number).toFixed(2)}`
        })

        kitchenBillString += `

        `

        clientBillString += `
        -----------------------
        Number of Items: ${res[0].items_quantity_total}
        Subtotal: $${(res[0].order_subtotal as number).toFixed(2)}` +
            `${res[0].order_discount !== 0 ? `
        Discount: -$${(res[0].order_discount as number).toFixed(2)}` : ''}` + `
        GST: $${(res[0].order_gst as number).toFixed(2)}
        Total: $${res[0].order_total.toFixed(2)}
        `

        const textToImage = require('text-to-image');

        const kitchenBillImageURI = textToImage.generateSync(
            kitchenBillString,
            { fontSize: 55, lineHeight: 20, maxWidth: 600 });

        const clientBillImageURI = textToImage.generateSync(
            clientBillString,
            { fontSize: 40, lineHeight: 55, margin: 30, maxWidth: 550 });

        let kitchenBillPath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-c.png`;
        let clientBillPath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-e.png`;

        const imageDataURI = require('image-data-uri');
        imageDataURI.outputFile(kitchenBillImageURI, kitchenBillPath)
        imageDataURI.outputFile(clientBillImageURI, clientBillPath)

        logInfo(createKitchenAndClientBill.name, `Success`)
        return { clientBillPath, kitchenBillPath, isDelivery: res[0].order_type === 2 };
    } catch (err) {


        // How far along in the process did we get to before failure?
        // does it matter or should we just delete all from this order and try again?
        // if an error happens we want to make sure that we have all the data required to go back to reordering this order.
        logError(createKitchenAndClientBill.name, `${err}`)
        throw err;
    }
}