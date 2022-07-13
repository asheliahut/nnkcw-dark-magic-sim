const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let enchantValue = 20;
let numberTries = 0;
let numberTimesAt20 = 0;

function enchant(enchantCurVal) {
  // flip a coin to see if the enchant will succeed
  let coin = Math.floor(Math.random() * 2);
  if (coin === 0) {
    // enchant succeeded
    enchantCurVal++;
    console.log(`Your weapon has been enchanted! It's now ${enchantCurVal}`);
  } else {
    // enchant failed
    if(enchantCurVal >= 21) {
      enchantCurVal--;
      if (enchantCurVal === 20) {
        numberTimesAt20++;
      }
      console.log(`Your weapon has failed. It's now ${enchantCurVal}`);
    } else {
      numberTimesAt20++;
      console.log(`Failed can not go lower than 20.`);
    }
    
  }

  return enchantCurVal;
}

// ask user for yes or no and continue asking until they answer no
function askUser(secondTry) {
  let question = "Do you want to enchant your weapon? (y/n)";
  if (secondTry) {
    question = "Do you want to continue enchanting? (y/n)";
  }
      
  rl.question(question, (answer) => {
    if (answer === 'y' || answer === 'Y' || answer === 'yes' || answer === 'Yes') {
      enchantValue = enchant(enchantValue);
      numberTries++;
      askUser(true);
    } else {
      rl.close();
    }
  });
}

rl.on('close', function () {
  console.log("\nGood Luck Next Time!!!");
  console.log(`\nYou tried ${numberTries} times.`);
  console.log(`\nYour weapon is now enchanted to ${enchantValue}`);
  console.log(`\nYou had ${numberTimesAt20} times at 20.`);
  process.exit(0);
});

function autoEnchant() {
  // ask user what they want to enchant their weapon to
  rl.question("What do you want to enchant your weapon to? (21-100)", (answer) => {
    while (enchantValue < answer) {
      enchantValue = enchant(enchantValue);
      numberTries++;
    }
    rl.close();
  });
}

  
// ask user if they want to automatically enchant their weapon or manually enchant it
rl.question("Do you want to automatically enchant your weapon? (y/n)", (answer) => {
  if (answer === 'y' || answer === 'Y' || answer === 'yes' || answer === 'Yes') {
    autoEnchant();
  } else {
    askUser(false);
  }
});
