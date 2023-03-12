//Used for testing so we dont spam the api and reach the limit
//when set to false it will remain stagnant - when set to true it will access the api
var access_api = false;

// Saves genre in local storage
function renderSavedGenre() {
    var lastSavedGenre = localStorage.getItem("userGenre");
    if (lastSavedGenre !== null) {
        // document.getElementById("saved-genre").innerHTML = lastSavedGenre;
    } else {
        return;
    }
    var searchUrl = 'https://online-movie-database.p.rapidapi.com/title/v2/find?title=the&limit=20&sortArg=moviemeter%2Casc&genre=' + lastSavedGenre;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'aaecda7e5dmsh4c3c75691c4c8e8p19be3djsn12b722b15a65',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    // Gets movie API data
    function getMovie() {
        return fetch (searchUrl, options)
        .then(function (response) {
            return response.json();
            })
            .then(function (data) {
                // Empty array for movie selections
                var randomMovieArray = [];
                // For loop to loop through each movie 3 times and randomly picks a movie in picked genre
                for (i = 0; i < 3; i++) {
                    var randomMovie = data.results[Math.floor(Math.random()*data.results.length)];
                    randomMovieArray.push(randomMovie);
                    var removedMovieIndex = data.results.indexOf(randomMovie);
                    data.results.splice(removedMovieIndex, 1);
                };
                renderMovies(randomMovieArray);
            });
    };
        getMovie();
  };

renderSavedGenre();

// Displays movie elements to results.html page
function renderMovies(movieArray) {
    for (i = 0; i < movieArray.length; i++) {
        // Array to display movies
        var currentMovie = movieArray[i];
        // Div to put movie/show data inside of 
        var movieDiv = $('<div>').addClass("movies");
        // h3 element to hold movie/show name
        var movieName = $('<h3>').addClass("movieName");
        movieName.text(currentMovie.title);
        movieDiv.append(movieName);
        // Img element to show movie/show's poster (changes src attr)
        var movieImg = $('<img>').addClass("movieImg").attr("src", currentMovie.image.url);
        movieDiv.append(movieImg);
        // Appends movieDiv to the main movie containter in the results.html
        $("#movie-container").append(movieDiv);
    } 
};

// this is the code to prevent reaching the Movie API call limit
// these are just place-holder names that you can change when making the functions
function getMovie()
{
    //code
}

function renderMovie(movie_data)
{
    //code
}

// ----- [DRINKS CODE] ----- //

// Empty array for drink information to go into
var drinkArray = [];

// Getting Cocktail API and pushing it to drinkArray
function getDrink() {
return fetch ('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        drinkArray.push(data.drinks[0])
    })
};

// Renders drinks as HTML elements and displays them to the page
function renderDrinks() {
    for (i = 0; i < drinkArray.length; i++) {
        // Array to display individual drinks
        var currentDrink = drinkArray[i];
        // Div to hold drink information
        var drinkDiv = $('<div>').addClass("drinks");
        // h3 element to hold drink name
        var drinkName = $('<h3>').addClass("drinkName");
        drinkName.text(currentDrink.strDrink);
        drinkDiv.append(drinkName);

        // created a ul with the class drinkIngredients
        var ingredientList = $('<ul>').addClass("drinkIngredients");
        //for loop to go over all the ingredients and measurements (the api returns 15 by default)
        for (var j = 0; j < 15; j++) {
            //if statement to check if ingredient and measurement are defined
            if (currentDrink['strIngredient' + j] && currentDrink['strMeasure' + j]) {
                // created a li with the class drinkIngredient
                var ingredient = $('<li>').addClass("drinkIngredient");
                //sets the text of the ingredient and the measurement separated by a space
                ingredient.text(currentDrink['strIngredient' + j] + ' - ' + currentDrink['strMeasure' + j]);
                ingredientList.append(ingredient);
            }
        }
        drinkDiv.append(ingredientList);

        // p element to hold drink instructions
        var drinkIns = $('<p>').addClass("drinkIns");
        drinkIns.text(currentDrink.strInstructions);
        drinkDiv.append(drinkIns);
        // img element to show drink and changes source 
        var drinkImg = $('<img>').addClass("drinkImg").attr("src", currentDrink.strDrinkThumb);
        drinkDiv.append(drinkImg);
        // appends the drinkDiv to the cocktail container on the results.html page
        $('#cocktail-container').append(drinkDiv);
    }
};


if (access_api) 
{
    // Copies getDrink to get second drink
    getDrink().then(function () {
        getDrink().then(renderDrinks);
    });

    //Movie code
    getMovie().then(renderMovie);
}
else 
{
    //For testing purposes, get drink without accessing api
    var drink_data = JSON.parse('{"drinks":[{"idDrink":"11102","strDrink":"Black Russian","strDrinkAlternate":null,"strTags":"IBA,ContemporaryClassic","strVideo":null,"strCategory":"Ordinary Drink","strIBA":"Contemporary Classics","strAlcoholic":"Alcoholic","strGlass":"Old-fashioned glass","strInstructions":"Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.","strInstructionsES":null,"strInstructionsDE":"Die Zutaten in ein old fashioned Glas mit Eiswürfeln geben. Vorsichtig umrühren.","strInstructionsFR":null,"strInstructionsIT":"Versare gli ingredienti in un bicchiere vecchio stile pieno di cubetti di ghiaccio. Mescola delicatamente.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/8oxlqf1606772765.jpg","strIngredient1":"Coffee liqueur","strIngredient2":"Vodka","strIngredient3":null,"strIngredient4":null,"strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"3/4 oz ","strMeasure2":"1 1/2 oz ","strMeasure3":null,"strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":"https://commons.wikimedia.org/wiki/File:Black_Russian.jpg","strImageAttribution":"firstName lastName","strCreativeCommonsConfirmed":"Yes","dateModified":"2017-09-02 16:54:49"}]}');
    drinkArray.push(drink_data.drinks[0]);
    renderDrinks();

    //For testing purposes, get movie without accessing api
    var movie_data = JSON.parse('{"@type":"imdb.api.title.technical","aspectRatios":["1.37 : 1 (negative ratio)","1.78 : 1","1.85 : 1 (theatrical ratio)"],"id":"/title/tt0107290/","title":"Jurassic Park","titleType":"movie","year":1993,"cameras":["Panavision Panaflex Gold, Panavision Primo and Slant Focus Lenses","Panavision Panaflex Platinum, Panavision Primo and Slant Focus Lenses"],"colorations":["Color","Color (Eastmancolor)"],"labs":["DeLuxe, Hollywood (CA), USA (color)"],"negativeFormats":["35 mm (also horizontal) (Eastman EXR 50D 5245, EXR 100T 5248, EXR 500T 5296)"],"printedFormats":["35 mm (Eastman 5384)","70 mm (horizontal) (IMAX DMR blow-up) (dual-strip 3-D) (Kodak Vision 2383) (2013 re-release)","D-Cinema (also 3-D version) (2013 re-release)"],"processes":["Digital Intermediate (4K) (2018 remaster)","Spherical","VistaVision (visual effects)"],"soundMixes":["DTS","Dolby Digital (Europe)","SDDS (3D re-release)","Datasat (3D re-release)","DTS (DTS: X)"]}');
    renderMovie(movie_data);
}