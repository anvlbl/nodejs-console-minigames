const readline = require('readline-sync');

const monster = {
    maxHealth: 30,
	currentHealth: 30,
    name: "Лютый",
    moves: [
    {   "id": "1",
        "name": "Удар когтистой лапой",
        "physicalDmg": 3, 
        "magicDmg": 0,    
        "physicArmorPercent": 20, 
        "magicArmorPercent": 20,  
        "CD": 0,        // cooldown
        "currCD": 0,    // current cooldown
    },
    {   "id": "2",
        "name": "Огненное дыхание",
        "physicalDmg": 0,
        "magicDmg": 4,
        "physicArmorPercent": 0,
        "magicArmorPercent": 0,
        "CD": 3,
        "currCD": 0,
    },
    {   "id": "3",
        "name": "Удар хвостом",
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
    {   "id": "1",
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercent": 0,
        "magicArmorPercent": 50,
        "CD": 0,
        "currCD": 0,
    },
    {   "id": "2",
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercent": 0,
        "magicArmorPercent": 0,
        "CD": 4,
        "currCD": 0,
    },
    {   "id": "3",
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercent": 0,
        "magicArmorPercent": 0,
        "CD": 3,
        "currCD": 0,
    },
    {   "id": "4",
        "name": "Магический блок",
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
const hit = obj => {	
	//choose the move with max damage (physical or magic)
	const action = arr => {
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
	}	
	return action(obj.moves);	//return the object (one of the action list)
};

//function below calculates the applied damage
const diff = (minuend, subtrahend) => {
    const physDmg = subtrahend.physicalDmg - (minuend.physicArmorPercent / 100 * subtrahend.physicalDmg);
    const magDmg = subtrahend.magicDmg - (minuend.magicArmorPercent / 100 * subtrahend.magicDmg);
    return physDmg + magDmg;
};

while (true) {
	if (monster.currentHealth <= 0) {
		console.log('you won!');
		break;
    }	    
    if (character.currentHealth <= 0) {
        console.log('you lose!');
        break;
    }
    // show current health of opponents
    console.log(`enemy's health: ${monster.currentHealth}`);
    console.log(`your health: ${character.currentHealth}`);

    const mdm = hit(monster);
    const cdm = hit(character);
    console.log(`${monster.name} applies the ${mdm.name}`);
    console.log(`${character.name} applies the ${cdm.name}`);

    monster.currentHealth -= diff(mdm, cdm);
    character.currentHealth -=diff(cdm, mdm);
};