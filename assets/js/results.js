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

    for (i = 0; i < drinkArray.length; i++) {
        var currentDrink = drinkArray[i];
        console.log(currentDrink);

        // 1. create div with class of drinks
        var drinkDiv = $('<div>').addClass("drinks");

        // 2. create h3 with class of drinkName
        // - text is strDrink
        // - append to div class drinks
        var drinkName = $('<h3>').addClass("drinkName");
        drinkName.text(currentDrink.strDrink);
        drinkDiv.append(drinkName);


        // 3. create a p tag with class drinkIns
        // - text is strInstructions
        // - append to div class drinks
        var drinkIns = $('<p>').addClass("drinkIns");
        drinkIns.text(currentDrink.strInstructions);
        drinkDiv.append(drinkIns);

        // 4. create img with class of drinkImg
        // - set image src attribute to strDrinkThumb
        // - append to div class drinks
        var drinkImg = $('<img>').addClass("drinkImg").attr("src", currentDrink.strDrinkThumb);
        drinkDiv.append(drinkImg);

        // 5. append to cocktail container
        $('#cocktail-container').append(drinkDiv);
        
    }
   
}

{/* <div id="drink-1" class="drinks">
            <h3 class="drinkName"></h3>
            <p class="drinkDesc"></p>
            <img class="drinkImg">
        </div> */}