const fpp = require('./FacePlusPlus')

const SOURCE = "https://www.biography.com/.image/t_share/MTE4MDAzNDEwNjkyNzY5Mjk0/sylvester-stallone-9491745-1-402.jpg";
const CHECK =
  "https://i.guim.co.uk/img/media/d5f57bc55ac016abea8bbbf18f3d7df9d4b1b7e5/0_54_3000_1800/master/3000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=2c456e42cfd7f60032405406e8bda768";

const API_KEY = "YOUR KEY";
const API_SECRET = "YOUR SECRET";

fpp.initialize(API_KEY, API_SECRET);

async function main() {
    fpp.match(SOURCE, CHECK, {
        type1: "url",
        type2: "url",
        threshold: 80.0
    })
    .then(match => console.log("Matched = " + match.matched + " with match-confidence " + match.confidence))
    .catch(err => console.log("Error: " + err.message));

    fpp.detectFace(SOURCE, {
        type: "url",
        num_faces: 1
    }).then(data => console.log("Face counts = 1: " + data)).catch(err => console.log("Error: " + err.message)); 
}

main();