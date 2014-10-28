/* README FILE 

---- Mitchel Foppen
---- V2-04
---- Frontend Development 2
---- 03-07-2014

________ BEST PRACTICES - Javascript ________

- camelCase (tja hij hoort erbij)
- Altijd "var" gebruiken, dus var x = "Hello" i.p.v. x = "Hello"
- Zet geen objecten en dergelijken in de global space, tenzij het een system-wide script is en je zeker weet dat het voordelen betrekt
- Gebruik relevante namen die internationaal te begrijpen zijn
- Gebruik comments om aan te geven waar het volgende stuk code voor gebruikt wordt, of het ergens van afhankelijk is (
  andere libraries), et cetera.
- Veel if/else kan opgelost worden met de || (OR) methode, wat vaak netter staat

________ BEST PRACTICES - algemeen ________

- Consistente mappen hiërarchie: 
	
	- Hoofdbestand
		- index.html (+ andere html bestanden)
		- Includes
			- Style
				- Bestanden
			- Javascript
				- Bestanden
			- Images
				- Bestanden
			- Fonts
				- Bestanden
			- Downloads
				- Bestanden

- HTML bestanden zonder hoofdletters of streepjes
- CSS bestanden met hoofdletters

________ BEST PRACTICES - HTML ________

- Alles tussen dubbele haakjes zetten (consistentie)
- Structuur duidelijk maken d.m.v. tabs
- Javascript bestanden onderaan het bestand zetten, voor het beëindigen van de body
- Gebruik definitieve paden (/Includes/Images/....jpg)

________ BEST PRACTICES - CSS ________

- Hoofdbestand Default.css noemen
- Bovenaan het bestand aangeven voor welke pagina het CSS bestand geldt, tenzij het Default.css heet
- Een gedeelte "STANDARD.CSS" creëren binnen Default.css met daarin veelgebruikte technieken (Bootstrap), eventueel toegewezen aan classes. 
  Hierdoor hoef je minder regels code te schrijven in de opvolgende CSS bestanden, en scheelt het je een
  hoop werk.
- Het CSS bestand opdelen in verschillende secties, waarin je duidelijk aangeeft welk deel van de HTML pagina je gaat stylen. 
  Dit gedeelte open je met /* START STYLING (...) */ en /* END STYLING (...) */
- Als je voorzetsels gebruikt (- o -, - webkit -, etc.), lijn ze uit zodat alle dubbele punten boven elkaar komen te staan.

	-webkit-transition:all 500ms ease;
	   -moz-transition:all 500ms ease;
		-ms-transition:all 500ms ease;
		 -o-transition:all 500ms ease;
			transition:all 500ms ease;

- Geen spaties in regels code, dus:

	form
	{
		border-width:1px;
		border-style:solid;
		border-color:#FFFFFF
	}

- Hexadecimale kleurcodes voluit schrijven.

________ BEST PRACTICES - JAVASCRIPT ________ (bron: http://www.w3schools.com/js/js_best_practices.asp)

- Gebruik geen globale variabelen, aangezien deze kunnen worden overschreven door andere scripts. Gebruike inplaats daarvan 
  locale variabelen (zet ze binnen de functie).
- Lokale variabelen moeten worden gedefinieerd met de "var" keyword.
- Nooit nummers, strings, etc. als objecten neerzetten (ofwel variabelen).
- Nooit een definitie eindigen met een komma (sommige JSON en Javascript engines kunnen hier niet meer overweg):

	points = [40, 100, 1, 5, 25, 10, ];
	person = {firstName:"John", lastName:"Doe", age:46, }

		-- Voorbeeld: http://www.w3schools.com/js/js_best_practices.asp



