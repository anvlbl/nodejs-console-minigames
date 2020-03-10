const monster = {
    maxHealth: 10,
	currentHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, 
            "magicDmg": 0,    
            "physicArmor%": 20, 
            "magicArmor%": 20,  
            "cooldown": 0,     
			"currentCooldown": 0,
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmor%": 0,
            "magicArmor%": 0,
            "cooldown": 3,
			"currentCooldown": 0,
        },
        {
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
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmor%": 0,
        "magicArmor%": 50,
        "cooldown": 0,
		"currentCooldown": 0,
    },
    {
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmor%": 0,
        "magicArmor%": 0,
        "cooldown": 4,
		"currentCooldown": 0,
    },
    {
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmor%": 0,
        "magicArmor%": 0,
        "cooldown": 3,
		"currentCooldown": 0,
    },
    {
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
		let dmg = 0, index = 0;
		// check the everything values of damage below
		// at first physical damage
		for (let i = 0; i < arr.length; i++) {
			if ((arr[i].physicalDmg > dmg) && (arr[i].currentCooldown === 0)) {				
				index = i;
			}
		}
		//and magic damage
		for (let i = 0; i < arr.length; i++) {
			if ((arr[i].magicDmg > dmg) && (arr[i].currentCooldown === 0)) {				
				index = i;
			}
		}
		return arr[index];
	}	
	console.dir(choiseMaxDmg(obj.moves));
};

hit(character);
//while (true) {
//	if (monster.currentHealth <= 0) {
//		console.log('you won!');
//		break;
//	}
//	
//	console.dir(monster.currentHealth);
//	monster.currentHealth =- hit(character);
//};


































