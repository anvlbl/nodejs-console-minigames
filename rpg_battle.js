const readline = require('readline-sync');

const monster = {
    maxHealth: 30,
	currentHealth: 30,
    name: "Лютый",
    moves: [
        {
			"id": 1,
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, 
            "magicDmg": 0,    
            "physicArmor%": 20, 
            "magicArmor%": 20,  
            "cooldown": 0,     
			"currentCooldown": 0,
        },
        {
			"id": 2,
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmor%": 0,
            "magicArmor%": 0,
            "cooldown": 3,
			"currentCooldown": 0,
        },
        {
			"id": 3,
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmor%": 50,
            "magicArmor%": 0,
            "cooldown": 2,
			"currentCooldown": 0,
        },
    ]
};

const character = {
	maxHealth: 10,
	currentHealth: 10,
	name: "Евстафий",
	moves: [
    {
		"id": 1,
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmor%": 0,
        "magicArmor%": 50,
        "cooldown": 0,
		"currentCooldown": 0,
    },
    {
		"id": 2,
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmor%": 0,
        "magicArmor%": 0,
        "cooldown": 4,
		"currentCooldown": 0,
    },
    {
		"id": 3,
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmor%": 0,
        "magicArmor%": 0,
        "cooldown": 3,
		"currentCooldown": 0,
    },
    {
		"id": 4,
        "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmor%": 100,
        "magicArmor%": 100,
        "cooldown": 4,
		"currentCooldown": 0,
    },
]
};



const hit = obj => {	
	//choose the move with max damage (physical or magic)
	const choiseMaxDmg = arr => {
		const len = arr.length;
		let dmg = 0, index = 0; typeOfDamage = "";
		// check the everything values of damage and cooldown below
		for (let i = 0; i < len; i++) {
			if ((arr[i].physicalDmg > dmg) && (arr[i].currentCooldown > 0)){ 
				arr[i].currentCooldown -= 1;
			}
			if ((arr[i].physicalDmg > dmg) && (arr[i].currentCooldown === 0)) {	
				dmg = arr[i].physicalDmg;
				index = i;
				typeOfDamage = "physical";
			}
		}
		for (let i = 0; i < len; i++) {
			if ((arr[i].magicDmg > dmg) && (arr[i].currentCooldown > 0)){
				arr[i].currentCooldown -= 1;
			}
			if ((arr[i].magicDmg > dmg) && (arr[i].currentCooldown === 0)) {	
				dmg = arr[i].magicDmg;			
				index = i;
				typeOfDamage = "magic";
			}
		}		
		arr[index].currentCooldown = arr[index].cooldown;
				
		console.log(`you are take the ${dmg} damage!`);
		return dmg;
	}	
	return choiseMaxDmg(obj.moves);	
};

while (true) {
	if (monster.currentHealth <= 0) {
		console.log('you won!');
		break;
	}	
	console.log('current health of enemy ' + monster.currentHealth);	
	console.table(character.moves);
	const query = readline.question(`Удар?`);
	monster.currentHealth -= hit(character);
};


































