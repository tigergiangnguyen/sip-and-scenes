
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
        return fetch(searchUrl, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Empty array for movie selections
                var randomMovieArray = [];
                // For loop to loop through each movie 3 times and randomly picks a movie in picked genre
                for (i = 0; i < 3; i++) {
                    var randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
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


// ----- [DRINKS CODE] ----- //

// Empty array for drink information to go into
var drinkArray = [];

// Getting Cocktail API and pushing it to drinkArray
function getDrink() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
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


// Copies getDrink to get second drink
getDrink().then(function () {
    getDrink().then(renderDrinks);
});