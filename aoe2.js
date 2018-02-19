var global=this;

// API Server config
var apiServer = "http://localhost";
var apiPort = "8080"
var apiUrl = apiServer + ":" + apiPort + "/units/"

// Define the 2 armies here
var army1 = {
	"Archer": 3,
	"Crossbowman": 4,
	"Arbalest": 2
};

var army2 = {
	"Archer": 1,
	"Crossbowman": 2
	
};

// Global array that are
var armyTab1 = [];
var armyTab2 = [];

// Loading the JSON file from local path
var jsonContent;

// Set frameRate
var fr = 3;

function preload(){
	// Loading the JSON
	jsonContent = loadJSON("http://localhost:8080/")
}

function setup() {
	createCanvas(710, 400);
	armyTab1 = buildArmy(army1);
	armyTab2 = buildArmy(army2);
	
	console.log(armyTab2);

	//bigFight(armyTab1, armyTab2);
		
}

function draw() {
	
	frameRate(fr);
	background(50, 89, 100);	
	red = color("#ff2a00");
	green = color("#74f756");
	fill(green);
	
	//console.log(armyTab1);
	
	/*for (var j=0; j < armyTab1.length; i++){

		rect(30, 30, armyTab1[j].hp, armyTab1[j] * 30);
	}*/
	
}

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
	this.alive = (this.hp > 0) ? true: false;

	this.fight = function(unit) {
		if (this.lastAttack < millis() - this.ad*1000){
			unit.hp -= this.at;
			this.lastAttack = millis();
		}
		
	};
}

// Get unit from JSON file
function getUnitFromJson(name){
	
	for (bat in jsonContent.units) {
		for (unit in jsonContent.units[bat]) {
			if (name == jsonContent.units[bat][unit].Name) {
				return jsonContent.units[bat][unit];
			}
		}
	}
	
	return null;
		
}

// Building the army from the JSON file
function buildArmy(army){	
	var armyTab = new Array();
    for (var name in army) {
        if (army.hasOwnProperty(name)) {
			var number = army[name];
			for (i = 0; i < number; i++){
				
				// Building the units from JSON file and pushing them to armyTab
				var unitJson = getUnitFromJson(name);
				if (unitJson){
					var unit = new Unit(
						unitJson["Name"],
						unitJson["Age"],
						unitJson["Cost"],
						unitJson["BT"],
						unitJson["RT"],
						unitJson["AD"],
						unitJson["MR"],
						unitJson["LOS"],
						unitJson["HP"],
						unitJson["RA"],
						unitJson["AT"],
						unitJson["AR"],
						
					);
					
				}
				armyTab.push(unit);
			}
        }
	}
	
	return armyTab;
 
}

// Fight between the 2 armies (ARRAYS)
function bigFight(army1, army2){
	
	// Army 1 has more units than army 2
	if (army1.length >= army2.length){
		
		for (var i=0; i < army1.length; i++){
				
				// One by one fight
				if (i < army2.length){
					army1[i].fight(army2[i]);
					army2[i].fight(army1[i]);
				}
				
				// Rest of army 1 units are fighting against first army 2 units
				else{
					army1[i].fight(army2[i%army2.length]);
				}
			
		}
		
	}
	
	// Army 2 has more units than army 1
	else {
		
		for (var i=0; i < army2.length; i++){
				
				// One by one fight
				if (i < army1.length){
					army2[i].fight(army1[i]);
					army1[i].fight(army2[i]);
				}
				
				// Rest of army 2 units are fighting against first army 1 units
				else{
					army2[i].fight(army1[i%army1.length]);
				}
			
		}
		
	}
			
}



