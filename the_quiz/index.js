const fs = require('fs');
const readline = require('readline-sync');
const handler = require('./handler');

//get the full collection of questions in our quiz
const questionCollection = fs.readdirSync('questions');

let list = [];

while (list.length < 5) {
  const randomFile = Math.floor(Math.random() * questionCollection.length - 1) + 1;
  if (list.includes(questionCollection[randomFile])) {
    continue;
  }
  list.push(questionCollection[randomFile]);
};

console.log(list);

let corrects = 0; //counter of correct answers

//quiz loop
for (const every of list) {
  handler.questionFile(every);
  const query = readline.question('input the index of correct answer: ');
  corrects += handler.checkTheCorrect(every, query);
};

console.log(`the end. Quantity of correct answers: ${corrects}`);