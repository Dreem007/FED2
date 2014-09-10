/*

// Les 1 - opdracht 3

// START STAP 3.1

function persoon(name) {
	this.name = name;
	this.speak = function() {
		alert( this.name + " zegt GOEDUH MiDdAg HiHu!" )
	}
} 

var bob1 = new persoon("Bob")

bob1.speak()

// EINDE STAP 3.1

// START STAP 3.2 

persoon.prototype.walk = function() {
	alert( this.name + " loopt nu naar jou toe als een Patrick" )
}

persoon.prototype.eat = function() {
	alert( "Eet " + this.name + " Op!" )
}

bob1.walk()
bob1.eat()

// EINDE STAP 3.2

// START STAP 3.3

var persoon = {
	name: "Bobbie",
   	speak: function() {
		alert( this.name + " zegt GOEDUH MiDdAg HiHu!" )
	},
	walk: function() {
		alert( this.name + " loopt nu naar jou toe als een Patrick" )
	},
	eat: function() {
		alert( "Eet " + this.name + " Op!" )
	}
}

persoon.eat()

// EINDE STAP 3.3

*/