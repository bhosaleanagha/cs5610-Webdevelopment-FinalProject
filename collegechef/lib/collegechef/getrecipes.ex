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

    def recipe_list(ingredient) do
        headers = [{:"x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"}, {:"x-rapidapi-key", "96fc031a22msh2956b4e91fafd72p1ce93ajsn1ca2cbaaae07"}]
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=4&ranking=1&ignorePantry=false&ingredients=#{ingredient}"
        resp = HTTPoison.get!(url, headers)
        data = Jason.decode!(resp.body)
        data
      end

      def org_recipes(ingredients) do
        recipes = recipe_list(ingredients)

        orgganized_result = %{}
        orgganized_result = Enum.map recipes, fn recipe ->
          %{
            id: recipe["id"],
            image: recipe["image"],
            name: recipe["title"],
            ingredients: recipe["usedIngredients"]
           }
        end

        orgganized_result
      end

      def getRecipeByIngredients(recipes, ingredients) do
        recipesResult = org_recipes(ingredients)
        recipes = Map.put(recipes, :recipesRes, recipesResult)
        recipes = Map.put(recipes, :redirect, "/apisearch")
        recipes
        end

end
