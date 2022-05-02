import { prisma } from '../../app'
import { logInfo } from '../../logging/utils'

export async function printOrder(order_id: number): Promise<void> {
    try {
       const englishBill = await createOrderImageEnglish(order_id)

        const ThermalPrinter = require('node-thermal-printer').printer
        const Types = require('node-thermal-printer').types

        async function printImage() {
            const printer = new ThermalPrinter({
                type: Types.EPSON,
                interface: '/dev/usb/lp0',
            });

            try {
                const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
                await delay(100)
                await printer.printImage(englishBill);
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

        let englishOrderString = `${res[0].order_id}-${orderTypeString}
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
            { fontSize: 35, lineHeight: 55, margin: 30, maxWidth: 550 });

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
