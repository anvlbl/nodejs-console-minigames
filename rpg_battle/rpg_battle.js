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
            "physicArmor%": 20, 
            "magicArmor%": 20,  
            "CD": 0,        // cooldown
			"currCD": 0,    // current cooldown
        },
        {   "id": "2",
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmor%": 0,
            "magicArmor%": 0,
            "CD": 3,
			"currCD": 0,
        },
        {   "id": "3",
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmor%": 50,
            "magicArmor%": 0,
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
        "physicArmor%": 0,
        "magicArmor%": 50,
        "CD": 0,
		"currCD": 0,
    },
    {   "id": "2",
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmor%": 0,
        "magicArmor%": 0,
        "CD": 4,
		"currCD": 0,
    },
    {   "id": "3",
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmor%": 0,
        "magicArmor%": 0,
        "CD": 3,
		"currCD": 0,
    },
    {   "id": "4",
        "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmor%": 100,
        "magicArmor%": 100,
        "CD": 4,
		"currCD": 0,
    },
]
};

// //function describes only monster actions logic - inflict max damage!
// const hit = obj => {	
// 	//choose the move with max damage (physical or magic)
// 	const chooseMaxDmg = arr => {
// 		const len = arr.length;
// 		let dmg = 0, index = 0;
// 		// check the everything values of damage and CD below
// 		for (let i = 0; i < len; i++) {
// 			if ((arr[i].physicalDmg > dmg) && (arr[i].currCD > 0)){ 
// 				arr[i].currCD -= 1;
// 			}
// 			if ((arr[i].physicalDmg > dmg) && (arr[i].currCD === 0)) {	
// 				dmg = arr[i].physicalDmg;
// 				index = i;
// 			}
// 		}
// 		for (let i = 0; i < len; i++) {
// 			if ((arr[i].magicDmg > dmg) && (arr[i].currCD > 0)){
// 				arr[i].currCD -= 1;
// 			}
// 			if ((arr[i].magicDmg > dmg) && (arr[i].currCD === 0)) {	
// 				dmg = arr[i].magicDmg;			
// 				index = i;
// 			}
// 		}		
// 		arr[index].currCD = arr[index].CD;
				
// 		console.log(`you are take the ${dmg} damage!`);
// 		return dmg;
// 	}	
// 	return chooseMaxDmg(obj.moves);	
// };

//function below describes monster actions logic - inflict max damage!
const hit = obj => {	
	//choose the move with max damage (physical or magic)
	const action = arr => {
		const len = arr.length;
		let dmg = 0, index = 0; dmgType = ""
		// check the everything values of damage and CD below
		for (let i = 0; i < len; i++) {
			if ((arr[i].physicalDmg > dmg) && (arr[i].currCD > 0)){ 
				arr[i].currCD -= 1;
			}
			if ((arr[i].physicalDmg > dmg) && (arr[i].currCD === 0)) {	
				dmg = arr[i].physicalDmg;
                index = i;
                damageType = "physical";
			}
		}
		for (let i = 0; i < len; i++) {
			if ((arr[i].magicDmg > dmg) && (arr[i].currCD > 0)){
				arr[i].currCD -= 1;
			}
			if ((arr[i].magicDmg > dmg) && (arr[i].currCD === 0)) {	
				dmg = arr[i].magicDmg;			
                index = i;
                damageType = "magic";
			}
		}		
		arr[index].currCD = arr[index].CD;
		
		return {
            name: arr[index].name,
            damage: dmg,
            damageType: dmgType
        };
	}	
	return action(obj.moves);	
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
    console.log(`current health of enemy: ${monster.currentHealth}`);
    console.log(`your current health: ${character.currentHealth}`);
    console.table(character.moves);

    let monsterMove = hit(monster);
    console.log(`monster says: "Now i will cast ${monsterMove.name}"`)
    const move = readline.question('What do we do?');	
    monster.currentHealth -= hit(character);
    
};


































