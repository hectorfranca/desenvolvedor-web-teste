searchButton = document.getElementById('search__button')

// Card elements
images = document.getElementsByClassName('card__image')
titles = document.getElementsByClassName('card__title')
types = document.getElementsByClassName('card__type')
ingredients = document.getElementsByClassName('card__ingredient')
instructions = document.getElementsByClassName('card__instructions')


url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
xhttp = new XMLHttpRequest()

xhttp.onload = function () {
    result = JSON.parse(this.response).drinks
    
    result.forEach(element => {
        // Get ingredients of drink
        ingredientsKeyList = Object.keys(element).filter(key => key.includes('strIngredient'))
        ingredientsHTML = ""

        ingredientsKeyList.forEach((key, index) => {
            if (element[key] != null) {
                ingredientsHTML += `<p>${index+1}- ${element[key]}</p>\n`
            }
        })

        cards = document.getElementsByClassName('cards')[0]

        cards.innerHTML += `
            <div class="card">
                <div class="card__image">
                    <img src="${element.strDrinkThumb}" alt="${element.strDrink}.jpg">
                </div>
                <div class="card__title">
                    <h2>${element.strDrink}</h2>
                </div>
                <div class="card__type">
                    <p>${element.strAlcoholic}</p>
                </div>
                <div class="card__ingredient">
                    ${ingredientsHTML}
                </div>
                <div class="card__instructions">
                    <p>${element.strInstructions}</p>
                </div>
            </div>
        `
    });
}

// Events
searchButton.addEventListener('click', () => {
    document.body.innerHTML += '<section class="cards"></section>'

    xhttp.open("GET", url);
    xhttp.send();
})


// console.log('Name: ' + JSON.parse(this.response).drinks[0].strDrink)
// console.log('Alcoólico: ' + JSON.parse(this.response).drinks[0].strAlcoholic)
// console.log('Foto: ' + JSON.parse(this.response).drinks[0].strDrinkThumb)
// console.log('Ingrediente 1: ' + JSON.parse(this.response).drinks[0].strIngredient1)
// console.log('Ingrediente 2: ' + JSON.parse(this.response).drinks[0].strIngredient2)
// console.log('Ingrediente 3: ' + JSON.parse(this.response).drinks[0].strIngredient3)
// console.log('Ingrediente 3: ' + JSON.parse(this.response).drinks[0].strInstructions)
