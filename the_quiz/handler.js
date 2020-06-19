const fs = require('fs');

//reads the question file and prints the question and variants of answers in the console
module.exports.questionFile = (file) => {
    const data = fs.readFileSync(`questions/${file}`, `utf8`);
    const line = data.split('\n')[0];
    console.log(line.toString());
    console.table(data.split('\n').slice(2).map(elem => elem.trim()));
};

//reads the correct answer from question file and compare him with user's input
module.exports.checkTheCorrect = (file, input) => {    
    const data = fs.readFileSync(`questions/${file}`, `utf8`);  
    const correct = +data.split('\n')[1];
    if (correct === +input) {
        return 1;
    }
        return 0;
};