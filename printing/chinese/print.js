
const ThermalPrinter = require('node-thermal-printer').printer
const Types = require('node-thermal-printer').types

async function printImage() {
    const printer = new ThermalPrinter({
        type: Types.EPSON,
        interface: process.argv[2],
    });

    try {
        await printer.printImage('./chinese/chinese.png');
        printer.cut();
        printer.execute();
    } catch (err) {
        console.log(err)
    }
}

printImage();
