/*

// Les 1 - opdracht 4

// START STAP 4.1

function scopeA() {
	var iterator = "iterator";
	var max = "max";
	var min = "min"
}

// EINDE STAP 4.1

// START STAP 4.2

var iterator = "iterator";
var max = "max";
var min = "min"

// EINDE STAP 4.2

// START STAP 4.3

// Lexical Scope ofwel "Closure" betekent dat een functie (B) binnen een functie (A) toegang heeft to variabelen en dergelijke die dus in
// moeder functie (A) staan. In het voorbeeld heeft functie (B) toegang tot de variabele - name - die in functie (A) staat genoteerd.

var functionA = function {
	var name = "Example";
	var functionB = function 
	{
		this.speak = function() {
			alert( name + " zegt GOEDUH MiDdAg HiHu!" )
		}
	}
}

// EINDE STAP 4.3

*/