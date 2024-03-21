// Search Section
searchButton = document.getElementById('search__button')
searchBar = document.getElementById('search__bar')
cards = document.getElementsByClassName('cards')[0]

// Card elements
images = document.getElementsByClassName('card__image')
titles = document.getElementsByClassName('card__title')
types = document.getElementsByClassName('card__type')
ingredients = document.getElementsByClassName('card__ingredient')
instructions = document.getElementsByClassName('card__instructions')

xhttp = new XMLHttpRequest()

xhttp.onload = function () {
    result = JSON.parse(this.response).drinks

    if (result != null) {
        cardsElement = ""
        
        result.forEach(element => {
            // Get ingredients of drink regardless of size and position
            ingredientsKeyList = Object.keys(element).filter(key => key.includes('strIngredient'))
            ingredientsHTML = ""

            ingredientsKeyList.forEach((key, index) => {
                if (element[key] != null) {
                    ingredientsHTML += `<p>${index+1}- ${element[key]}</p>\n`
                }
            })

            cardsElement += `
                <div class="card">
                    <div class="card__image">
                        <img src="${element.strDrinkThumb}" alt="${element.strDrink}.jpg">
                    </div>
                    <div class="card__title">
                        <h2>${element.strDrink}</h2>
                    </div>
                    <div class="card__type">
                        <p>Type: ${element.strAlcoholic}</p>
                    </div>
                    <div class="card__ingredient">
                        <p>Ingredients:<p><br>
                        ${ingredientsHTML}
                    </div>
                    <div class="card__instructions">
                        <p>Instructions: ${element.strInstructions}</p>
                    </div>
                </div>\n
            `
        });
        
        cards.innerHTML = cardsElement
    } else {
        cards.innerHTML = "<p class=card__error>Drink not found.</p>"
    }
}

// Events
searchButton.addEventListener('click', () => {
    if (searchBar.value != "") {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBar.value}`
        
        xhttp.open("GET", url);
        xhttp.send();
    }
})

searchBar.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
})
