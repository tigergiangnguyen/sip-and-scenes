// Saves genre in local storage
function renderSavedGenre() {
    var lastSavedGenre = localStorage.getItem("userGenre");
    if (lastSavedGenre !== null) {
        document.getElementById("saved-genre").innerHTML = lastSavedGenre;
    } else {
        return;
    }
  };

  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'aaecda7e5dmsh4c3c75691c4c8e8p19be3djsn12b722b15a65',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

var searchUrl = 'https://online-movie-database.p.rapidapi.com/title/v2/find?title=game%20of&limit=20&sortArg=moviemeter%2Casc&genre=comedy';
var movieArray = [];

// fetch(searchUrl, options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

function getMovie() {
    return fetch (searchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            movieArray.push(data.movies[0]);
        })
};

function renderMovies() {
    for (i = 0; i < movieArray.length; i++) {
        var currentMovie = movieArray[i];
        var movieDiv = $('<div>').addClass("movies");
        var movieName = $('<h3>').addClass("movieName");
        movieName.text(currentMovie.strMovie);
        movieDiv.append(movieName);

        var movieDescr = $('<ul>')
    }
}

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


//Used for testing so we dont spam the api and reach the limit
var access_api = true;
if (access_api) 
{
    // Copies getDrink to get second drink
    getDrink().then(function () {
        getDrink().then(renderDrinks);
    });
}
else 
{
    //For testing purposes, show drink without accessing api
    var data = JSON.parse('{"drinks":[{"idDrink":"11102","strDrink":"Black Russian","strDrinkAlternate":null,"strTags":"IBA,ContemporaryClassic","strVideo":null,"strCategory":"Ordinary Drink","strIBA":"Contemporary Classics","strAlcoholic":"Alcoholic","strGlass":"Old-fashioned glass","strInstructions":"Pour the ingredients into an old fashioned glass filled with ice cubes. Stir gently.","strInstructionsES":null,"strInstructionsDE":"Die Zutaten in ein old fashioned Glas mit Eiswürfeln geben. Vorsichtig umrühren.","strInstructionsFR":null,"strInstructionsIT":"Versare gli ingredienti in un bicchiere vecchio stile pieno di cubetti di ghiaccio. Mescola delicatamente.","strInstructionsZH-HANS":null,"strInstructionsZH-HANT":null,"strDrinkThumb":"https://www.thecocktaildb.com/images/media/drink/8oxlqf1606772765.jpg","strIngredient1":"Coffee liqueur","strIngredient2":"Vodka","strIngredient3":null,"strIngredient4":null,"strIngredient5":null,"strIngredient6":null,"strIngredient7":null,"strIngredient8":null,"strIngredient9":null,"strIngredient10":null,"strIngredient11":null,"strIngredient12":null,"strIngredient13":null,"strIngredient14":null,"strIngredient15":null,"strMeasure1":"3/4 oz ","strMeasure2":"1 1/2 oz ","strMeasure3":null,"strMeasure4":null,"strMeasure5":null,"strMeasure6":null,"strMeasure7":null,"strMeasure8":null,"strMeasure9":null,"strMeasure10":null,"strMeasure11":null,"strMeasure12":null,"strMeasure13":null,"strMeasure14":null,"strMeasure15":null,"strImageSource":"https://commons.wikimedia.org/wiki/File:Black_Russian.jpg","strImageAttribution":"firstName lastName","strCreativeCommonsConfirmed":"Yes","dateModified":"2017-09-02 16:54:49"}]}');
    drinkArray.push(data.drinks[0]);
    renderDrinks();
}


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
