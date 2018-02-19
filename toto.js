var apiServer = "http://localhost";
var apiPort = "8080"
var apiUrl = apiServer + ":" + apiPort + "/units/"

var army1 = {
	"Archer": 3,
	"Crossbowman": 4,
	"Arbalest": 2
};

var army2 = {
	"Archer": 1,
	"Crossbowman": 2
	
};

var armyTab1 = [];
var armyTab2 = [];

var fr = 3; // Framerate

var jsonContent;

// Unit class
function Unit(name, age, cost, bt, rt, ad, mr, hp, ra, at, ar) {

	this.name = name;
	this.age = age;
	this.cost = cost;
	this.bt = bt;
	this.rt = rt;
	this.ad = ad;
	this.mr = mr;
	this.hp = hp;
	this.ra = ra;
	this.at = at;
	this.ar = ar;
	this.lastAttack = 0;
	this.alive = true;

	this.fight = function(unit) {
		if (this.lastAttack < millis() - this.ad*1000){
			unit.hp -= this.at;
			this.lastAttack = millis();
		}
		
	};
}

function buildArmy(army){
	
	var armyTab = [];
    for (var name in army) {
        if (army.hasOwnProperty(name)) {
			var number = army[name];
			for (i =0; i < number; i++){
				
				httpGet(apiUrl + name, 'json', function(response) {    
					jsonContent = response;
					var unit = new Unit(
						response["Name"], 
						response["Age"], 
						response["Cost"], 
						response["BT"], 
						response["RT"], 
						response["AD"], 
						response["MR"], 
						response["HP"],
						response["RA"],
						response["AT"],
						response["AR"]
					);
					
					armyTab.push(unit);

				});	
			}
        }
	}
	
	return armyTab;
 
}

function bigFight(army1, army2){
	
	//console.log(armyTab1.length);
	
		
}

var tab = [];

var unit1 = new Unit("toto", 1, 2, 3 , 4 , 5 , 6, 7, 8, 9, 10);
var unit2 = new Unit("toto", 1, 2, 3 , 4 , 5 , 6, 7, 8, 9, 10);
var unit3 = new Unit("toto", 1, 2, 3 , 4 , 5 , 6, 7, 8, 9, 10);

tab.push(unit1);
tab.push(unit2);
tab.push(unit3);
console.log(tab);
	


