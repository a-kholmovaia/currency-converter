const input = require('sync-input');

let converter = {
    currencies : ["JPY", "EUR", "RUB", "GBP", "USD"],
    values : [113.500, 0.8900, 74.3600, 0.7500, 1],
    printcList() {
        console.log(`1 USD equals 1 USD`);
        let i;
        for(i=0; i<this.currencies.length-1; i++) {
            console.log(`1 USD equals ${this.values[i]} ${this.currencies[i]}`);
        }
    }
}

function greeting() {
    console.log("Welcome to Currency Converter!");
    converter.printcList();
    menu();
}

function checkCurrValid(curr) {
    return converter.currencies.includes(curr);
}

function menu() {
    console.log("What do you want to do?\n1-Convert currencies 2-Exit program");
    let caseM = Number(input());
    switch (caseM) {
        case 1:
            convert();
            break;
        case 2:
            console.log("Have a nice day!");
            break;
        default:
            console.log("Unknown input");
            menu();
            break;
    }
}

function convert() {
    console.log("What do you want to convert?");
    let currF = input("From: ").toUpperCase();
    if (checkCurrValid(currF)) {
        let currT = input("To: ").toUpperCase();
        if (checkCurrValid(currT)) {
            let amount = input("Amount: ");
            if (isNaN(amount)) {
                console.log("The amount has to be a number");
                convert();
            } else if (amount < 1) {
                console.log("The amount cannot be less than 1");
                convert();
            } else {
                return result(currF, currT, amount);
            }
        } else {
            console.log("Unknown currency");
            convert();
        }
    } else {
        console.log("Unknown currency");
        convert();
    }
}

function getIndexOfCurr(curr) {
    return converter.currencies.indexOf(curr)
}

function result(currF, currT, amount) {
    let toUSD = amount / converter.values[getIndexOfCurr(currF)];
    let i = converter.currencies.indexOf(currT);
    let res;
    if (currT == "USD") {
        res = toUSD.toFixed(4);
    } else {
        res = (converter.values[i] * toUSD).toFixed(4);
    }
    console.log(`Result: ${amount} ${currF} equals ${res} ${currT}`);
}

greeting()