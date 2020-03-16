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
            damageType: damageType
        };
	}	
	return action(obj.moves);	
};

module.exports = {hit};