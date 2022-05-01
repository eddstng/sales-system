
const textToImage = require('text-to-image');


// using the synchronous API
const dataUri = textToImage.generateSync(
`32-DELIVERY
604-123-0987
5340 CHARLESTON CRT
04/30/2022 12:30
---------------------
明爐燒鴨

-1x
---
酥炸春卷

-4x
---

D-4

-1x
---

星洲炒米

-1x
---

鹹魚雞粒炒飯

-1x
---

薑蔥焗生蠔

-1x
---
`,
{fontSize: 75,   lineHeight: 65, maxWidth: 600 });


// Some image data uri
let dataURI = dataUri;
 
const imageDataURI = require('image-data-uri');

// It will create the full path in case it doesn't exist
// If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI
let filePath = './chinese/chinese.png';
 
// Returns a Promise
imageDataURI.outputFile(dataURI, filePath)
 
    // RETURNS image path of the created file 'out/path/fileName.png'
    .then(res => console.log(res))