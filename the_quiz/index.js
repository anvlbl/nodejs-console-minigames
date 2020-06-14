const fs = require('fs');
const readLine = require('readline-sync');
  
const data = fs.readFileSync('questions/fook.txt', 'utf8');
const line = data.split('\n')[0];
const right = +data.split('\n')[1];
console.log(line.toString());
console.log(data.split('\n').slice(1));

const query = +readLine.question('input the variant ');

if (query === right) {
  console.log('Is correct answer!');
}
else console.log('hooy');