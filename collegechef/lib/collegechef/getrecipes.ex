defmodule Collegechef.GetRecipes do
    alias Collegechef.Recipes

    def new do
        %{
          recipesRes: %{},
          redirect: "",
        }
    end

    def client_view(recipes) do
        %{
            recipesRes: recipes.recipesRes,
            redirect: recipes.redirect
        }
    end

    def get_recipes(recipes, searchWords) do
        recipesResult = Recipes.get_recipes!(searchWords)

        recipes = Map.put(recipes, :recipesRes, recipesResult)
        recipes = Map.put(recipes, :redirect, "/search")
        recipes
    end

    def api_key do
       System.get_env("APP_API_KEY") || Application.get_env(:collegechef, :api_key)
    end

    def recipe_list(ingredient) do
        headers = [{:"x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"}, {:"x-rapidapi-key", api_key()}]
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ignorePantry=false&ingredients=#{ingredient}"
        resp = HTTPoison.get!(url, headers)
        data = Jason.decode!(resp.body)
        Enum.shuffle(data)
        Enum.shuffle(data)
        data
      end

      def org_recipes(ingredients) do
        recipes = recipe_list(ingredients)

        organized_result = %{}
        organized_result = Enum.map recipes, fn recipe ->
          %{
            id: recipe["id"],
            image: recipe["image"],
            name: recipe["title"],
            ingredients: recipe["usedIngredients"]
           }
        end
        organized_result
      end

      def getRecipeByIngredients(recipes, ingredients) do
        recipesResult = org_recipes(ingredients)
        recipes = Map.put(recipes, :recipesRes, recipesResult)
        recipes = Map.put(recipes, :redirect, "/apisearch")
        recipes
        end

end
