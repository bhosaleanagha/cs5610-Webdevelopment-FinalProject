defmodule CollegechefWeb.SpoonacularAPI.Spoonacular do
  def init(_arg) do end

  def recipe_list(ingredient) do
    ingredient = Enum.join(ingredient, ",")
    headers = [{:"x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"}, {:"x-rapidapi-key", ""}]
    url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=4&ranking=1&ignorePantry=false&ingredients=#{ingredient}"
    resp = HTTPoison.get!(url, headers)
    data = Jason.decode!(resp.body)
    data
  end

  def getRecipeByIngredients(ingredient) do
    recipes = recipe_list(ingredient)
    Enum.map recipes, fn recipe ->
      %{
        id: recipe["id"],
        image: recipe["image"],
        name: recipe["title"],
        ingredients: recipe["usedIngredients"]
       }
    end
  end

end
