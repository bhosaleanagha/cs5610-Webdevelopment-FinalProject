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
end