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
}

// Copies getDrink to get second drink
getDrink().then(function() {
    getDrink().then(renderDrinks);
});

// Renders drinks as HTML elements and displays them to the page
function renderDrinks() {
    console.log(drinkArray);
    var drinkName = $('.drinkName');
    var drinkDesc = $('.drinkDesc');
    var drinkImg = $('.drinkImg');
    var currentDrink = 0;

    $.each(drinkArray, function(i) {
       console.log(i)
       drinkName[i].text = drinkArray[currentDrink];
    });
   
}

