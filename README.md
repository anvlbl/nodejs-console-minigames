# mindgames_console

It's a beginner's pet-project includes some small logic games.
Node.js is required to launch apps.
***
### 1.Bulls and cows
A simple logic game popular among students and school children.

The computer generates a number thst you are given several attempts to guess.
The correct digits standing on their places - are bulls, the correct digits standing on their wrong places - are cows.
For example: computer the generate number 1836, on first attempt you input 6815, computer returns answer:
>1 bulls, 2 cows

it means that 1 digit in your number is right and standing on their place (digit 8), and two digits is right, but standing on wrong places (digits 6 and 1).

### 2.RPG battle
Fantasy-style text game in console.

Actually includes only the batlle between your character and monster. You have a set of actions that you can use against the computer.
Computer has set moves too, but also has very primitive logic. Kill the monster and don't let yourself be killed. It is possible to change the difficulty. 

### 3. The quiz

The project's folder contains the files with the questions and variants of answers. In this case quiz theme - Tolkien's creativity. Start from index.js script choose 5 files from main folder, print the question to console and considers the correct answers. Use the node modules and Node fs API.
