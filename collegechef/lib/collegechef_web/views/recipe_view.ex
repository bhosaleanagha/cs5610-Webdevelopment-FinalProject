defmodule CollegechefWeb.RecipeView do
  use CollegechefWeb, :view
  alias CollegechefWeb.RecipeView

  def render("index.json", %{recipes: recipes}) do
    %{data: render_many(recipes, RecipeView, "recipe.json")}
  end

  def render("show.json", %{recipe: recipe}) do
    %{data: render_one(recipe, RecipeView, "recipe.json")}
  end

  def render("recipe.json", %{recipe: recipe}) do
    %{id: recipe.id,
      cuisine: recipe.cuisine,
      name: recipe.name,
      data: recipe.data,
      diet: recipe.diet,
      duration: recipe.duration,
      description: recipe.description,
      ingredients: recipe.ingredients,
      likes: recipe.likes,
      dislikes: recipe.dislikes
    }
  end
end
