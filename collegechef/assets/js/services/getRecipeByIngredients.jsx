import config from '../config'

export default async function getRecipeByIngredients(ingredients){
    let request = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=`;
    var ingredientString = ingredients.map(ingredient => ingredient);
    request = request + ingredientString;

    try {
        const resp = await fetch(request, {
            'method': 'GET',
            'headers': {
                'x-rapidapi-host': config.config.API_HOST,
                'x-rapidapi-key': config.config.API_KEY
            }
        }).then(resp => {
            return resp.json();
        })
        console.log(resp)
    } catch (error) {
        console.log(error);
    }
}
