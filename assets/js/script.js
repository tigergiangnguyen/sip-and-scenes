var drinkArray = [];



// Getting Cocktail API
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


function renderDrinks() {
    console.log(drinkArray);
}

