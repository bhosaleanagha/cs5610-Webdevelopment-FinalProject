defmodule SpoonacularAPI do
  def init(_arg) do end

  def getRecipeByIngredients(ingredient) do
    ingredient = Enum.join(ingredient, ",")
    headers = [{:"x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"}, {:"x-rapidapi-key", "d27f1a7be3msh150733918b6af2dp1a8935jsn3401dd91ba53"}]
    url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=5&ranking=1&ignorePantry=false&ingredients=#{ingredient}"
    resp = HTTPoison.get!(url, headers)
    data = Jason.decode!(resp.body)
  end
end
