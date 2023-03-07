// Saves genre in local storage
function renderSavedGenre() {
    var lastSavedGenre = localStorage.getItem("userGenre");
    if (lastSavedGenre !== null) {
        document.getElementById("saved-genre").innerHTML = lastSavedGenre;
    } else {
        return;
    }
  };













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


// Copies getDrink to get second drink
getDrink().then(function() {
    getDrink().then(renderDrinks);
});

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
