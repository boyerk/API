let req = "https://api.nexchange.io/en/api/v1/volume/?format=json&hours=1";
let kryptoData;
let k = 10;
let gud;
let state = "MovingRight";
let currency;
let currencyRest;
let cryptopic;
//need to make individual variables for the pairs for each currency you use
//var req2= "https://api.nexchange.io/en/api/v1/price/pair_name/latest/?format=json";
function preload() {
    loadJSON(req, currencyRecieved);
    cryptopic = loadImage("https://cdn-images-1.medium.com/max/2000/1*BnXHRV0vQCqJqpzE6escSQ.jpeg");

    //   gud = loadFont("Pixels.TTF");
}

function currencyRecieved(krypto) {
    kryptoData = krypto;
}

function setup() {
    createCanvas(1920, 1680);
    //noLoop();
    //console.log(kryptoData.tradable_pairs.length);
    //console.log(kryptoData.tradable_pairs[0].pair.name);
    //console.log(kryptoData.tradable_pairs.length);
    // for(var i=0; i<kryptoData.tradable_pairs.length; i+=1) {

    // }
}

function draw() {
    let y = 50;
    let y2 = 50;
    let x = 50;
    let x2 = 1000;

    background(50);
    image(cryptopic, 0, 0, width, height);
    fill(50, 100);
    rect(0, 0, width, height);
    fill(255);

    for (var i = 0; i <= kryptoData.tradable_pairs.length - 30; i += 1) {
        currency = kryptoData.tradable_pairs[i];
        //textSize(18);
        //text(currency.pair.name, x, y);
        //text(currency.last_ask, x+175, y);
        strokeWeight(3);
        stroke(0);
        textSize(18);
        text(currency.pair.base.name + " " + currency.pair.base.code, x, y);
        stroke(255, 131, 0);
        strokeWeight(5);
        let valueUSD = 350;
        if (currency.last_ask > 1000 && currency.last_ask < 3000) {
            valueUSD = 500;
        } else if (currency.last_ask > 500 && currency.last_ask < 1000) {
            valueUSD = 400;
        } else if (currency.last_ask > 3000 && currency.last_ask < 10000) {
            valueUSD = 600;
        } else if (currency.last_ask > 100 && currency.last_ask < 500) {
            valueUSD = 300;
        } else if (currency.last_ask < 100 && currency.last_ask > 50) {
            valueUSD = 200;
        } else if (currency.last_ask < 50 && currency.last_ask > 1) {
            valueUSD = 75;
        } else if (currency.last_ask < 1 && currency.last_ask > .5) {
            valueUSD = 50;
            stroke(255, 0, 0);
        } else if (currency.last_ask < .5 && currency.last_ask > .05) {
            valueUSD = 25;
            stroke(255, 0, 0);
        } else if (currency.last_ask < .1) {
            valueUSD = 10;
            stroke(255, 0, 0);
        } else if (currency.last_ask > 10000 && currency.last_ask < 100000) {
            //stroke(255, 131, 0);
            stroke(255, 255, 0);
            valueUSD = 650;
            print("orange");
        } else if (currency.last_ask > 100000) {
            print("green");
            valueUSD = 650;
            stroke(0, 255, 0);
        }

        line(x, y + 5, x + valueUSD + k, y + 5);
        textSize(12);
        strokeWeight(2.5);
        stroke(0);
        text(currency.last_ask + " " + currency.pair.quote.code, x + valueUSD + 5, y + 16);
        y += 33;
        //x+=10;
    }
    for (var b = 31; b < kryptoData.tradable_pairs.length; b += 1) {
        currencyRest = kryptoData.tradable_pairs[b];
        strokeWeight(3);
        stroke(0);
        textSize(18);
        text(currencyRest.pair.base.name + " " + currencyRest.pair.base.code, x2, y2);
        print(currencyRest.last_ask);
        stroke(255, 131, 0);
        strokeWeight(5);
        let moneyVal = 350;
        if (currencyRest.last_ask > 1000 && currencyRest.last_ask < 3000) {
            moneyVal = 500;
        } else if (currencyRest.last_ask > 500 && currencyRest.last_ask < 1000) {
            moneyVal = 400;
        } else if (currencyRest.last_ask > 3000 && currencyRest.last_ask < 10000) {
            moneyVal = 600;
        } else if (currencyRest.last_ask > 100 && currencyRest.last_ask < 500) {
            moneyVal = 300;
        } else if (currencyRest.last_ask < 100 && currencyRest.last_ask > 50) {
            moneyVal = 200;
        } else if (currencyRest.last_ask < 50 && currencyRest.last_ask > 1) {
            moneyVal = 75;
        } else if (currencyRest.last_ask < 1 && currencyRest.last_ask > .5) {
            moneyVal = 50;
            stroke(255, 0, 0);
            print("still small");
        } else if (currencyRest.last_ask < .5 && currencyRest.last_ask > .05) {
            moneyVal = 25;
            stroke(255, 0, 0);
        } else if (currencyRest.last_ask < .1) {
            moneyVal = 10;
            stroke(255, 0, 0);
            print("should be red");
            //print(currencyRest.last_ask);
        } else if (currencyRest.last_ask > 10000 && currencyRest.last_ask < 100000) {
            stroke(255, 255, 0);
            moneyVal = 650;
        } else if (currencyRest.last_ask > 100000) {
            stroke(0, 255, 0);
            moneyVal = 750;
        }

        line(x2, y2 + 5, x2 + moneyVal + k, y2 + 5);
        textSize(12);
        strokeWeight(2.5);
        stroke(0);
        text(currencyRest.last_ask + " " + currencyRest.pair.quote.code, x2 + moneyVal + 5, y2 + 17);
        y2 += 35;
        //x2+=15;

        //console.log(currencyRest.pair.name);

    }
    if (state == "MovingRight") {
        k += .2;
        if (k > 100) {
            state = "MovingLeft";
        }
    } else if (state == "MovingLeft") {
        k -= .2;
        if (k < 20) {
            state = "MovingRight";
        }
    }
    textSize(24);
    textFont("monospace");
    text("Crypto Currency Trade Values Every Hour", 610, 20);
    stroke(255);
    line(600, 25, 1180, 25);

    //console.log(kryptoData.tradable_pairs[60].last_ask);
}