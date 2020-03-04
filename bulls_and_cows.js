const readLine = require('readline-sync');

const secretNumber = Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 100000);
const length = String(secretNumber).length;

console.log(`My guessed number contains ${length} digits`);
console.log(secretNumber);

const getHint = (secret, guess) => {

let bulls = 0;
let cows = 0;

const secretArr = String(secret).split('').map(elem => +elem);
const guessArr = guess.split('').map(elem => +elem);

for (let i = 0; i < secretArr.length;) {
    if (secretArr[i] === guessArr[i]) {
        bulls += 1;
        secretArr.splice(i, 1);
        guessArr.splice(i, 1);
    }
    else i += 1;
}

for (let j = 0; j <= guessArr.length; j++) {
    if (secretArr.includes(guessArr[j])) {
        cows += 1;
        secretArr.splice(secretArr.indexOf(guessArr[j]), 1);
    }
}

    return `${bulls} bulls ${cows} cows`;
};

while (true) {

const query = readLine.question("input your number: ");
  if (+query === secretNumber) {
    console.log("you win! number what i guess is really " + secretNumber);
    break;
  }

console.log(`${getHint(secretNumber, query)}`);

console.log(`return your ${query}`);

};
