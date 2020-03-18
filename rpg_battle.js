"use strict"
const readline = require('readline-sync');

const monster = {
    maxHealth: 30,
	currentHealth: 30,
    name: "Лютый",
    moves: [
    {   "name": "Удар когтистой лапой",
        "physicalDmg": 3, 
        "magicDmg": 0,    
        "physicArmorPercent": 20, 
        "magicArmorPercent": 20,  
        "CD": 0,        // cooldown
        "currCD": 0,    // current cooldown
    },
    {   "name": "Огненное дыхание",
        "physicalDmg": 0,
        "magicDmg": 4,
        "physicArmorPercent": 0,
        "magicArmorPercent": 0,
        "CD": 3,
        "currCD": 0,
    },
    {   "name": "Удар хвостом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercent": 50,
        "magicArmorPercent": 0,
        "CD": 2,
        "currCD": 0,
    },
]
};

const character = {
	maxHealth: 30,
	currentHealth: 30,
	name: "Евстафий",
	moves: [
    {   "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercent": 0,
        "magicArmorPercent": 50,
        "CD": 0,
        "currCD": 0,
    },
    {   "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercent": 0,
        "magicArmorPercent": 0,
        "CD": 4,
        "currCD": 0,
    },
    {   "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercent": 0,
        "magicArmorPercent": 0,
        "CD": 3,
        "currCD": 0,
    },
    {   "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmorPercent": 100,
        "magicArmorPercent": 100,
        "CD": 4,
        "currCD": 0,
    },
]
};

//function describes monster actions logic
//return the object (one of the action list with max damage and zero coooldown)
//choose the action with max damage (physical or magic)
const hit = arr => {
	const len = arr.length;
	let dmg = 0, index = 0;
	for (let i = 0; i < len; i++) {
		if ((arr[i].physicalDmg > dmg) && (arr[i].currCD > 0)){ 
			arr[i].currCD -= 1;
		}
		if ((arr[i].physicalDmg > dmg) && (arr[i].currCD === 0)) {	
			dmg = arr[i].physicalDmg;
            index = i;                
		}
	}
	for (let i = 0; i < len; i++) {
		if ((arr[i].magicDmg > dmg) && (arr[i].currCD > 0)){
			arr[i].currCD -= 1;
		}
		if ((arr[i].magicDmg > dmg) && (arr[i].currCD === 0)) {	
			dmg = arr[i].magicDmg;			
            index = i;               
		}
	}		
	arr[index].currCD = arr[index].CD;		
	return arr[index];        
};

//function below calculates the applied damage
const diff = (minuend, subtrahend) => {
	if ((typeof(minuend) !== "object") || (typeof(subtrahend) !== "object")) {		
		return -1;
	}
    const physDmg = subtrahend.physicalDmg - (minuend.physicArmorPercent / 100 * subtrahend.physicalDmg);
    const magDmg = subtrahend.magicDmg - (minuend.magicArmorPercent / 100 * subtrahend.magicDmg);
    return Math.round(physDmg + magDmg);
};

console.table(monster.moves);
while (true) {
	if ((monster.currentHealth <= 0) && (character.currentHealth <= 0)) {
		console.log();
	}
	if (monster.currentHealth <= 0) {
		console.log('you won!');
		break;
    }	    
    if (character.currentHealth <= 0) {
        console.log('you lose!');
        break;
    }
    // show current health of opponents
    console.log(`health of ${monster.name}: ${monster.currentHealth}`);
    console.log(`health of ${character.name}: ${character.currentHealth}`);

	// calculate the action of monster
	const mdm = hit(monster.moves);

	console.table(character.moves); 	
	console.log(`${monster.name} says: "Now i apply ${mdm.name}"`);
	
	const playerInput = readline.question('what do we do? ')

    //requesting an action from the player and cheking the input
    const cdm = character.moves[+playerInput];
	if (cdm.currCD !== 0) {
		console.log(`this action is not ready`);
		continue;
	}
	if ((diff(mdm, cdm) === -1) || (diff(cdm, mdm) === -1)) {
		console.log("incorrect input data");
		continue;
	}
	
	cdm.currCD = cdm.CD;
	
	monster.currentHealth -= diff(mdm, cdm);
    character.currentHealth -=diff(cdm, mdm);

    console.log(`${monster.name} applies the ${mdm.name} and give ${mdm.physicalDmg + mdm.magicDmg} damage`);
    console.log(`${character.name} applies the ${cdm.name} and give ${cdm.physicalDmg + cdm.magicDmg} damage`);    
	
	monster.moves.map(elem => elem.currCD <= 0 ? elem.currCD = 0 : elem.currCD -= 1);
	character.moves.map(elem => elem.currCD <= 0 ? elem.currCD = 0 : elem.currCD -= 1);
};