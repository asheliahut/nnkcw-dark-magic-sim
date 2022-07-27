const d3nBar = require('d3node-barchart');
const output = require('d3node-output');

function enchant(enchantCurVal) {
  // flip a coin to see if the enchant will succeed
  let coin = Math.floor(Math.random() * 2);
  if (coin === 0) {
    // enchant succeeded
    enchantCurVal++;
  } else {
    // enchant failed
    if(enchantCurVal >= 21) {
      enchantCurVal--;
    }
  }

  return enchantCurVal;
}

let numberScenarios = 100000;
const maxEnchant = 99;
let curMaxEnchant = 21;
let entries = [];
let index = 0;


// run a number of scenarios of enchanting and store the results in an array
while (curMaxEnchant <= maxEnchant) {
  const numberTriesArray = [];
  for (let i = 0; i < numberScenarios; i++) {
    let enchantValue = 20;
    let numberTries = 0;
    
    while (enchantValue <= curMaxEnchant) {
      enchantValue = enchant(enchantValue);
      numberTries++;
    }
  
    numberTriesArray.push(numberTries);
  }
  entries[index] = {
    key: curMaxEnchant,
    value: numberTriesArray.reduce((a, b) => a + b, 0) / numberTriesArray.length
  };
  index++;
  curMaxEnchant++;
}



const bar = d3nBar({ data: entries, container: '<div id="container"><h2>Average Number of Enchants from +20 to That Number</h2><div id="chart"></div></div>' });
output('./output', bar);