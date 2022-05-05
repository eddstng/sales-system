import { prisma } from '../../app'
import { logInfo } from '../../logging/utils'

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getThermalPrinterInterface(): Promise<string> {
    try {
        const { stdout, stderr } = await exec('ls /dev/usb | grep lp');
        return `/dev/usb/${stdout.trim()}`
    } catch (err: unknown) {
        console.error(err);
        throw err
    };
}
export async function printOrder(order_id: number): Promise<void> {
    try {

        const ThermalPrinter = require('node-thermal-printer').printer
        const Types = require('node-thermal-printer').types

        async function printImage() {
            const printer = new ThermalPrinter({
                type: Types.EPSON,
                interface: (await getThermalPrinterInterface()),
            });

            try {
                const englishBill = await createOrderImageEnglish(order_id)
                const chineseBill = await createOrderImageChinese(order_id)
                const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
                await delay(5)
                await printer.printImage(englishBill);
                printer.cut();
                await printer.printImage(chineseBill);
                printer.cut();
                printer.execute();
            } catch (err) {
                console.log(err)
            }
        }
        printImage();
        logInfo(printOrder.name, `[✓]`)
        return;
    } catch (err) {
        logInfo(printOrder.name, `[✗] ${err}`)
        throw err;
    }
}

export async function createOrderImageEnglish(order_id: number): Promise<string> {
    try {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        await delay(100)
        const res = await prisma.orders_items_detail.findMany(
            {
                where: {
                    order_id: order_id,
                }
            }
        )

        let orderTypeString = 'PICK UP'
        if (res[0].order_type === 0) {
            orderTypeString = 'DINE IN'
        }
        if (res[0].order_type === 2) {
            orderTypeString = 'DELIVERY'
        }

        let englishOrderString = `RESTAURANT NAME 
        1234 HASTINGS ST, VANCOUVER, BC
        604-888-8888
        
        ${res[0].order_id}-${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US")}
        -----------------------`;

        res.forEach((element: any) => {
            englishOrderString += `
            ${element.item_name_chn}
            ${element.item_name_eng}
            ${element.orders_items_quantity}x ${(element.item_price as number).toFixed(2)}`
        })

        englishOrderString += `
        -----------------------
        Subtotal: $${(res[0].order_subtotal as number).toFixed(2)}` +
            `${res[0].order_discount !== 0 ? `
        Discount: -$${(res[0].order_discount as number).toFixed(2)}` : ''}` + `
        GST: $${(res[0].order_gst as number).toFixed(2)}
        Total: $${res[0].order_total.toFixed(2)}
        `
        const textToImage = require('text-to-image');

        const dataUri = textToImage.generateSync(
            englishOrderString,
            { fontSize: 40, lineHeight: 55, margin: 30, maxWidth: 550 });

        const imageDataURI = require('image-data-uri');
        let filePath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-e.png`;
        imageDataURI.outputFile(dataUri, filePath)
            .then((res: any) => console.log(res))
        logInfo(printOrder.name, `[✓]`)
        return filePath;
    } catch (err) {
        logInfo(printOrder.name, `[✗] ${err}`)
        throw err;
    }
}

export async function createOrderImageChinese(order_id: number): Promise<string> {
    try {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        await delay(100)
        const res = await prisma.orders_items_detail.findMany(
            {
                where: {
                    order_id: order_id,
                }
            }
        )

        let orderTypeString = 'PICK UP'
        if (res[0].order_type === 0) {
            orderTypeString = 'DINE IN'
        }
        if (res[0].order_type === 2) {
            orderTypeString = 'DELIVERY'
        }

        let englishOrderString = `${res[0].order_id}-${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US")}
        -----------------------`;

        res.forEach((element: any) => {
            if (element.item_custom_name !== null) {
                englishOrderString += `
                \n#${element.item_custom_name}#

                
                ${element.orders_items_quantity}x`
            } else {
                englishOrderString += `
                ${element.item_name_chn} x${element.orders_items_quantity}
                `
            }
        })

        const textToImage = require('text-to-image');

        const dataUri = textToImage.generateSync(
            englishOrderString,
            { fontSize: 65, lineHeight: 65, maxWidth: 600 });

        const imageDataURI = require('image-data-uri');
        let filePath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-c.png`;
        imageDataURI.outputFile(dataUri, filePath)
            .then((res: any) => console.log(res))
        logInfo(printOrder.name, `[✓]`)
        return filePath;
    } catch (err) {
        logInfo(printOrder.name, `[✗] ${err}`)
        throw err;
    }
}
