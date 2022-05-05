import { prisma } from '../../app'
import { logInfo } from '../../logging/utils'

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getThermalPrinterInterface(): Promise<string> {
    try {
        const { stdout } = await exec('ls /dev/usb | grep lp');
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
                const kitchenAndClientBills = await createKitchenAndClientBill(order_id)
                const clientBillPath = kitchenAndClientBills.clientBillPath
                const kitchenBillPath = kitchenAndClientBills.kitchenBillPath
                const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
                await delay(5)
                await printer.printImage('./src/repositories/printOrder/header.png');
                await printer.printImage(clientBillPath);
                printer.cut();
                await printer.printImage(kitchenBillPath);
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

export async function createKitchenAndClientBill(order_id: number): Promise<{ clientBillPath: string, kitchenBillPath: string }> {
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

        let kitchenBillString = `${res[0].order_id}-${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US")}
        -----------------------`;

        let clientBillString = `
        ${res[0].order_id}-${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US")}
        -----------------------`;

        res.forEach((element: any) => {
            if (element.item_custom_name !== null) {
                kitchenBillString += `
                \n⊵${element.item_custom_name}

                ____________ x${element.orders_items_quantity}`
            } else {
                kitchenBillString += `
                ${element.item_name_chn} x${element.orders_items_quantity}
                `
            }

            clientBillString += `
            ${element.item_name_chn}
            ${element.item_name_eng}
            ${element.orders_items_quantity}x ${(element.item_price as number).toFixed(2)}`
        })

        clientBillString += `
        -----------------------
        Subtotal: $${(res[0].order_subtotal as number).toFixed(2)}` +
            `${res[0].order_discount !== 0 ? `
        Discount: -$${(res[0].order_discount as number).toFixed(2)}` : ''}` + `
        GST: $${(res[0].order_gst as number).toFixed(2)}
        Total: $${res[0].order_total.toFixed(2)}
        `

        const textToImage = require('text-to-image');

        const kitchenBillImageURI = textToImage.generateSync(
            kitchenBillString,
            { fontSize: 65, lineHeight: 65, maxWidth: 600 });

        const clientBillImageURI = textToImage.generateSync(
            clientBillString,
            { fontSize: 40, lineHeight: 55, margin: 30, maxWidth: 550 });
            
        let kitchenBillPath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-c.png`;
        let clientBillPath = `./src/repositories/printOrder/bills/${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")}/${order_id}-e.png`;

        const imageDataURI = require('image-data-uri');
        imageDataURI.outputFile(kitchenBillImageURI, kitchenBillPath)
            .then((res: any) => console.log(res))
        imageDataURI.outputFile(clientBillImageURI, clientBillPath)
            .then((res: any) => console.log(res))

        logInfo(createKitchenAndClientBill.name, `[✓]`)
        return { clientBillPath, kitchenBillPath };
    } catch (err) {
        logInfo(createKitchenAndClientBill.name, `[✗] ${err}`)
        throw err;
    }
}