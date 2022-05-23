import { prisma } from '../../app'
import { logInfo } from '../../logging/utils'
import { thermalPrinterInterface } from '../../app';

const ThermalPrinter = require('node-thermal-printer').printer
const Types = require('node-thermal-printer').types

export async function printOrder(printObj: {order_id: number, printClient: boolean, printKitchen: boolean}): Promise<void> {
    try {
        async function printImage() {
            const printer = new ThermalPrinter({
                type: Types.EPSON,
                interface: thermalPrinterInterface,
            });

            const kitchenAndClientBills = await createKitchenAndClientBill(printObj.order_id)
            const clientBillPath = kitchenAndClientBills.clientBillPath
            const kitchenBillPath = kitchenAndClientBills.kitchenBillPath
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
            await delay(5)
            if (printObj.printKitchen) {
                await printer.printImage(kitchenBillPath);
                printer.cut();
            }
            if (printObj.printClient) {
                await printer.printImage('./src/repositories/printOrder/header.png');
                await printer.printImage(clientBillPath);
                printer.cut();
                // await printer.printImage('./src/repositories/printOrder/header.png');
                // await printer.printImage(clientBillPath);
                // printer.cut();
            }
            printer.execute();
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

        let kitchenBillString = `${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
        -----------------------`;

        let clientBillString = `${orderTypeString}
        ${res[0].customer_phone}
        ` + `${res[0].order_type === 2 ? `${res[0].customer_address}
        ` : ''}` + `${res[0].order_timestamp?.toLocaleDateString("zh-Hans-CN")} - ${res[0].order_timestamp?.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })}
        -----------------------`;

        res.forEach((element: any) => {
            let kitchenCustomizationString: string = '';
            if (element.orders_items_customizations !== null) {
                element.orders_items_customizations.forEach((element: { name_eng: string }) => {
                    kitchenCustomizationString += `\n ⤷___________`
                })
            }

            if (element.item_custom_name !== null) {
                kitchenBillString += `
                ⊵____________ x${element.orders_items_quantity}${kitchenCustomizationString ? kitchenCustomizationString : ''}`

            } else {
                kitchenBillString += `
                ${element.item_name_chn} x${element.orders_items_quantity}
                ${kitchenCustomizationString}`
            }

            kitchenBillString += `
            `
            let clientCustomizationString: string = '';
            if (element.orders_items_customizations !== null) {
                element.orders_items_customizations.forEach((element: { name_eng: string }) => {
                    clientCustomizationString += `\n ⤷${element.name_eng}`
                })
            }
            console.log("==========")
            console.log(element)
            console.log("==========")

            clientBillString += `
            ${element.item_name_chn === 'Custom Item' ? `⊵${element.item_name_chn}` : element.item_name_chn}
            ${element.item_name_eng}${clientCustomizationString ? clientCustomizationString : ''}
            ${element.orders_items_quantity}x ${(element.item_price as number).toFixed(2)}`
        })

        kitchenBillString += `
        `

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
            { fontSize: 55, lineHeight: 45, maxWidth: 600 });

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