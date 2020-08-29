const fpp = require('./FacePlusPlus')

const SOURCE = "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjkyNzY5Mjk0/sylvester-stallone-9491745-1-402.jpg";
const CHECK = "https://upload.wikimedia.org/wikipedia/commons/8/84/Sylvester_Stallone_Cannes_2019.jpg";

const API_KEY = "<Your API Key>";
const API_SECRET = "<Your API Secret>";

fpp.initialize(API_KEY, API_SECRET);

async function main() {
    fpp.match(SOURCE, CHECK, {
        type: "url"
    })
    .then(data => console.log(JSON.stringify(data)))
    .catch(err => console.log(err.message));
}

main();