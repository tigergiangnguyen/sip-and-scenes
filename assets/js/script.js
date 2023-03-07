var searchBtn = $("#searchButton");
var genreSelect = $("#genre-selector");

// Gets the value from the user's genre selected and storages it
function savedGenre() {
    var userGenre = genreSelect.val()
    localStorage.setItem("userGenre", userGenre);
};

// Button moves the windows to results page
searchBtn.click (function() {
    savedGenre();
    window.location.href="./results.html";
});