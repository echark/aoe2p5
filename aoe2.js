// API Server config
var apiServer = "http://localhost";
var apiPort = "8080"
var apiUrl = apiServer + ":" + apiPort + "/units/"

// Define the 2 armies here
var army1 = {
	"Archer": 1,
	"Crossbowman": 1,
	"Cavalry Archer": 1
};

var army2 = {
	"Eagle Warrior": 1,
	"Spearman": 1
	
};

// Global array that are
var armyTab1 = [];
var armyTab2 = [];

// Loading the JSON file from local path
var jsonContent;

// Set frameRate
var fr = 3;

var textUnitColor;
var red;
var green;
var blue;

function preload(){
	// Loading the JSON
	jsonContent = loadJSON("http://localhost:8080/")
}

function setup() {
	// Colors
	createCanvas(710, 400);
	armyTab1 = buildArmy(army1);
	armyTab2 = buildArmy(army2);
	
}

function draw() {
	
	// Set framerate
	frameRate(fr);
	
	// Set background
	background(50, 89, 100);
	
	// Set colors
	textUnitColor = color("#000000");
	red = color("#ff2a00");
	green = color("#74f756");
	blue = color("#2e00ff");
	
	bigFight(armyTab1, armyTab2);	
	
}

// Unit class
function Unit(name, age, cost, bt, rt, ad, mr, los, hp, ra, at, ar, x, y) {
	
	this.name = name;
	this.age = age;
	this.cost = cost;
	this.bt = bt;
	this.rt = rt;
	this.ad = ad;
	this.mr = mr;
	this.los = los;
	this.hp = hp;
	this.ra = ra;
	this.at = at;
	this.ar = ar;
	this.lastAttack = 0;
	this.alive = (this.hp > 0) ? true: false;
	this.x;
	this.y;

	this.fight = function(unit) {
		if (this.lastAttack < millis() - this.ad*1000){
			//console.log("Unit " + this.name + " attacks " + unit.name);
			//console.log("HP of the victim:" + unit.hp);
			unit.hp -= this.at;
			this.lastAttack = millis();
		}
		
	};
	
	this.get = function(property){
		return this[property];
	}
	
	this.displayLeft = function (){
		
		this.hp = (this.hp < 0) ? 0 : this.hp;
		fill(textUnitColor);
		text(this.name, x, y);
		fill(green);
		rect(x, y, this.hp*5, 20);
	}
	
	this.displayRight = function (){
		
		this.hp = (this.hp < 0) ? 0 : this.hp;
		fill(textUnitColor);
		text(this.name, width/2-x, y);
		fill(blue);
		rect(width/2-x, y, this.hp*5, 20);
	}
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
	// Initial position
	var x = 10;
	var y = 20;
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
						x,
						y
						
					);
					
				}
				y += 50;
				armyTab.push(unit);
			}
        }
	}
	
	return armyTab;
 
}

function findNextAlive(army){
	
	for (var i=0; i < army.length; i++){
		if (army[i].get("hp") > 0) return i;
			
	}
}
// Fight between the 2 armies (ARRAYS)
function bigFight(army1, army2){
	var j=0;
	// Army 1 has more units than army 2
	if (army1.length >= army2.length){
		
		for (var i=0; i < army1.length; i++){
				
				if (army1[i].get("hp") > 0 && army1[i].get("hp") > 0){
					
					// One by one fight
					if (i < army2.length){
						
						// If unit is alive, keep fighting
						if (army2[i].get("hp") > 0) army1[i].fight(army2[i]);
						
						// If unit is dead, fight with next alive
						else army1[i].fight(army2[findNextAlive(army2)]);
						
						// If unit is alive, keep fighting
						if (army1[i].get("hp") > 0) army2[i].fight(army1[i]);
						// If unit is dead, fight with next alive
						else army2[i].fight(army1[findNextAlive(army1)]);

					}
					
					// Rest of army 1 units are fighting against first army 2 units
					else{
						army1[i].fight(army2[i%army2.length]);
						
						if (army1[i].get("hp") > 0) army2[i%army2.length].fight(army1[i]);
						// If unit is dead, fight with next alive
						else army2[i%army2.length].fight(army1[findNextAlive(army1)]);
					}
					
				}
				
				armyTab1[i].displayLeft();
				if (j < armyTab2.length - 1){
					armyTab2[j].displayRight();
					j++;
				}
				else 
					armyTab2[j].displayRight();
				
			
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



