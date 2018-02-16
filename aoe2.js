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

var armyTab1= [];
var armyTab2 = [];

var fr = 3; // Framerate

var jsonContent;

function preload() {
	buildArmy(army1, armyTab1);
	buildArmy(army2, armyTab2);
	bigFight(armyTab1, armyTab2);
}

function setup() {
	createCanvas(710, 400);
	console.log(armyTab1);
	console.log(armyTab2);
		
}

function draw() {
	
	frameRate(fr);
	
	background(50, 89, 100);	
	green = color("#74f756");
	red = color("#ff2a00");
	
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
	this.alive = true;

	this.fight = function(unit) {
		if (this.lastAttack < millis() - this.ad*1000){
			unit.hp -= this.at;
			this.lastAttack = millis();
		}
		
	};
}

function buildArmy(army,armyTab){
	
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
 
}

function bigFight(army1, army2){
	
	console.log(army1.length);
	for (i=0; i < army1.length ; i++){
		
		console.log(army1[i]);
	}
	
	for (var j in army2){
			
		console.log(army2[j]);
			
	}
		
}


