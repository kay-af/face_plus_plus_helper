const fpp = require('./FacePlusPlus')
const b64 = require('image-to-base64')

const SOURCE_DIR = "images/source.jpg";
const CHECK_DIR = "images/check.jpg";

const API_KEY = "<Your API Key here>";
const API_SECRET = "<Your API Secret here>";

fpp.initialize(API_KEY, API_SECRET);

async function main() {
    const img1 = await b64(SOURCE_DIR);
    const img2 = await b64(CHECK_DIR);
    const result = await fpp.match(img1, img2);

    console.log(JSON.stringify(result));
}

main();