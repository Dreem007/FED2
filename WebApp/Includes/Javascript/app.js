// AVV 1, FRONT-END DEVELOPMENT 2 - WOENSDAG, 22 OKTOBER 2014

// Creeër namespace
var movieApp = movieApp || {};

(function() {

	// Start de functies binnen de eigenschap "controller" van variabele "movieApp" (ofwel de namespace)
	movieApp.controller = {

		init: function() 
		{

			movieApp.router.init();
			movieApp.sections.init();
			movieApp.selector.init();
		}

	};

	// Zorgt voor het schakelen tussen de navigatie elementen
	// Zorgt voor het schakelen tussen genres en titels
	movieApp.router = {

		init: function() 
		{

			routie({
			    'about': function() {
			    	movieApp.sections.toggle("about");
			    },

			    'movies': function() {
			    	movieApp.sections.toggle("movies");
			    },

			    'movies/genre/:genre': function(genre){
                    movieApp.content.genre(genre);
                    Transparency.render(document.getElementById('filter'), movieApp.content.filteredData, movieApp.content.directives);
                    movieApp.sections.toggle("filter");
                },

                'movies/:title': function(title) {
                    movieApp.content.title(title);
                    Transparency.render(document.getElementById('detail'), movieApp.content.filteredData, movieApp.content.directives);
                    movieApp.sections.toggle("detail");
                },

			});

		}

	};

	movieApp.content = {

		// Simpele vorm van Transparency
		about: function() {

			var about = 
			[
				{title: "About this app"},
			  	{description: "Cities fall but they are rebuilt. heroes die but they are remembered. the man likes to play chess; let's get him some rocks. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. bruce... i'm god. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all. rehabilitated? well, now let me see. you know, i don't have any idea what that means. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. rehabilitated? well, now let me see. you know, i don't have any idea what that means. cities fall but they are rebuilt. heroes die but they are remembered. no, this is mount everest. you should flip on the discovery channel from time to time. but i guess you can't now, being dead and all."},
			  	{description: "I did the same thing to gandhi, he didn't eat for three weeks. bruce... i'm god. cities fall but they are rebuilt. heroes die but they are remembered. i once heard a wise man say there are no perfect men. only perfect intentions. cities fall but they are rebuilt. heroes die but they are remembered. boxing is about respect. getting it for yourself, and taking it away from the other guy. well, what is it today? more spelunking? let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. bruce... i'm god. well, what is it today? more spelunking? it only took me six days. same time it took the lord to make the world. i did the same thing to gandhi, he didn't eat for three weeks."},
			  	{description: "Let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. boxing is about respect. getting it for yourself, and taking it away from the other guy. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. you measure yourself by the people who measure themselves by you. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. circumstances have taught me that a man's ethics are the only possessions he will take beyond the grave. you measure yourself by the people who measure themselves by you. you measure yourself by the people who measure themselves by you. that tall drink of water with the silver spoon up his ass. i once heard a wise man say there are no perfect men. only perfect intentions. mister wayne, if you don't want to tell me exactly what you're doing, when i'm asked, i don't have to lie. but don't think of me as an idiot. boxing is about respect. getting it for yourself, and taking it away from the other guy."},
			  	{description: "That tall drink of water with the silver spoon up his ass. well, what is it today? more spelunking? i now issue a new commandment: thou shalt do the dance. let me tell you something my friend. hope is a dangerous thing. hope can drive a man insane. i did the same thing to gandhi, he didn't eat for three weeks. the man likes to play chess; let's get him some rocks. i now issue a new commandment: thou shalt do the dance. i now issue a new commandment: thou shalt do the dance. multiply your anger by about a hundred, kate, that's how much he thinks he loves you. i don't think they tried to market it to the billionaire, spelunking, base-jumping crowd. that tall drink of water with the silver spoon up his ass. it only took me six days. same time it took the lord to make the world. "}
			];

			Transparency.render(document.getElementById("about"), about);

		},

		// XHR: method: "GET", de url van de API, wat er moet gebeuren als het proces succesvol is, vorm van de data
		// .bind(this) zorgt ervoor dat "this" verwijst naar movieApp.content.movies i.p.v. Transparency.render
		movies: function() {
			movieApp.xhr.trigger("GET", "http://dennistel.nl/movies", movieApp.content.success.bind(this), "JSON");
		},

		// Deze methode speelt af als er succesvol data wordt gehaald uit de API
		success: function(text) {
			// Zet JSON text om naar een Javascript object
           	movieApp.content.movies = JSON.parse(text);
           	// Controleer of de browser HTML5 support heeft voor storage.
           	if(typeof(Storage) !== "undefined") 
			{
				// Werkt op principe van "name/value".
				// JSON.stringify zet de methode movieApp.content.movies om naar een string, omdat alleen strings opgeslagen kunnen worden.
				localStorage.setItem("movieData", JSON.stringify(movieApp.content.movies));
				localStorage.getItem("movieData");
			} else {
			    console.log("Damn! No Web Storage support.. Better get that browser update :D");
			};
			// Roep de methode movieApp.content.underscoreProps aan
			movieApp.content.underscoreProps();
			Transparency.render(document.getElementById("movies"), this.movies, this.directives);
		},

		// Methode met undescore; zorgt voor het ophalen van de scores, waarna het gemiddelde daarvan berekend en getoond wordt
		underscoreProps: function() {
			// _.map= creeër een array met alle waarden
			// _.reduce= reduceert alle waarden binnen een array tot een enkele waarde
			_.map(movieApp.content.movies, function (movie){
				var movie
                movie.score = _.reduce(movie.reviews, function(memo, review){ return memo + review.score; }, 0) / movie.reviews.length;

                // Zet alle hoofdletters binnen een titel om naar kleine letters
                // Vervang de aangegeven tekens met een "-"
	            movie.url = movie.title.replace(/\s+/g, '-').toLowerCase();
            });
		},

		// Methode met underscore; zorgt voor het filteren op de juiste genre
		genre: function(filter){
			// Creeër een nieuwe methode binnen movieApp.content genaamd "filteredData" die hetzelfde is als movieApp.content.movies
            movieApp.content.filteredData = movieApp.content.movies;
            // _.each= gaat over een array met waarden heen. 
            _.each(movieApp.content.filteredData, function (movie, i){
                movie.genre = _.contains(_.filter(movie.genres, function(genre){return genre;}), filter);
            });
            // Stelt movieApp.content.filteredData gelijk aan -
            // _.where= kijkt naar alle waarden binnen een array, en geeft alleen de waarden terug met het juiste sleutelwoord. 
            movieApp.content.filteredData = _.where(movieApp.content.movies, {genre:true});
            console.log(movieApp.content.filteredData);
        },

        // Methode met underscore; zorgt voor het filteren op de juiste titel
        title: function(filter){
            movieApp.content.filteredData = _.where(movieApp.content.movies, {url: filter});
        },

       	// Variabele van Transparecy
       	// cover= hangt "cover" afkomstig uit de API aan de src (van een img)
       	// title= hang "title" afkomstig uit de API aan de href (van een link)
		directives: {
			cover: {
			    src: function(params) 
			    {
			    	return this.cover;
			    }
		  	},

		  	title: {
                href: function(params){
                    return "#movies/" + this.url;
                }
            }
		}

	};

	movieApp.sections = {

		// Start de functies binnen de methode "init"
		init: function() {
			movieApp.content.about();
			movieApp.content.movies();
		},

		// Methode waarmee geschakeld wordt tussen display:block en display:none
		// Als "section" gelijk wordt gesteld aan waarde x, zet dan deze if statement in.
		// Via routie wordt er een waarde aan "section" gehangen
		toggle: function(section) {
			if (section === "about") {
				document.getElementById("about").classList.add("Active");
				document.getElementById("ShowMovies").classList.remove("Active");
				document.getElementById("detail").classList.remove("Active");
				document.getElementById("filter").classList.remove("Active");
				document.getElementById("GenreNavigation").classList.remove("Active");
			} else if(section === "movies") {
				document.getElementById("ShowMovies").classList.add("Active");
				document.getElementById("GenreNavigation").classList.add("Active");
				document.getElementById("about").classList.remove("Active");
				document.getElementById("detail").classList.remove("Active");
				document.getElementById("filter").classList.remove("Active");
			} else if(section === "detail") {
				document.getElementById("detail").classList.add("Active");
				document.getElementById("GenreNavigation").classList.add("Active");
				document.getElementById("ShowMovies").classList.remove("Active");
				document.getElementById("about").classList.remove("Active");
				document.getElementById("filter").classList.remove("Active");
			} else if(section === "filter") {
				document.getElementById("filter").classList.add("Active");
				document.getElementById("GenreNavigation").classList.add("Active");
				document.getElementById("about").classList.remove("Active");
				document.getElementById("ShowMovies").classList.remove("Active");
				document.getElementById("detail").classList.remove("Active");
			}
		}

	};

	movieApp.selector = {

		init: function() {
			var selector, elems, makeActive;
			selector = 'a';
			elems = document.querySelectorAll(selector);
			makeActive = function () 
			{
			    for (var i = 0; i < elems.length; i++)
			    elems[i].classList.remove('ActiveTwo');

			   	this.classList.add('ActiveTwo');

			}; 
			for (var i = 0; i < elems.length; i++)
			elems[i].addEventListener('mousedown', makeActive);
		}

	};

	movieApp.xhr = {
		trigger: function (type, url, success, data) 
		{
			var req = new XMLHttpRequest;
			req.open(type, url, true);

			req.setRequestHeader('Content-type','application/json');

			type === 'POST' ? req.send(data) : req.send(null);

			req.onreadystatechange = function() {
				if (req.readyState === 4) {
					if (req.status === 200 || req.status === 201) 
					{
						success(req.responseText);
					}
				}
			}
		}
	};

})();

// Start de methode "init" binnen de eigenschap "controller" van het object "movieApp" (ofwel de namespace)
movieApp.controller.init();