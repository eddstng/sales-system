const textToImage = require('text-to-image');

const dataUri = textToImage.generateSync(
`32-DELIVERY
604-123-0987
5340 CHARLESTON CRT
04/30/2022 12:30
------------------------
明爐燒鴨
BBQ Duck
-1x 10.50

酥炸春卷
Egg Roll
-4x 7.80

D-4
Dinner Special 4
-1x 63.50

星洲炒米
Singapore Rice Noodle Curry
-1x 12.75

鹹魚雞粒炒飯
Diced Chkn Salted Fish FR
-1x 15.00

薑蔥焗生蠔
Fried Oyster Ginger Grn Onion
-1x 22.95

-----------------------
Subtotal: 132.50
Discount: 0.00
GST: 6.63
Total: $139.13`,
{fontSize: 35,   lineHeight: 55 , margin: 30, maxWidth: 550 });

// Some image data uri
let dataURI = dataUri;
 
const imageDataURI = require('image-data-uri');

// It will create the full path in case it doesn't exist
// If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
let filePath = './english/english.png';
 
// Returns a Promise
imageDataURI.outputFile(dataURI, filePath)
 
    // RETURNS image path of the created file 'out/path/fileName.png'
    .then(res => console.log(res))