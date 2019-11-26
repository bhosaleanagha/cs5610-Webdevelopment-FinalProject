defmodule Collegechef.Recipes do
  @moduledoc """
  The Recipes context.
  """

  import Ecto.Query, warn: false
  alias Collegechef.Repo

  alias Collegechef.Recipes.Recipe
  alias Collegechef.Users.User

  @doc """
  Returns the list of recipes.

  ## Examples

      iex> list_recipes()
      [%Recipe{}, ...]

  """
  def list_recipes do
    Repo.all(Recipe)
  end

  @doc """
  Gets a single recipe.

  Raises `Ecto.NoResultsError` if the Recipe does not exist.

  ## Examples

      iex> get_recipe!(123)
      %Recipe{}

      iex> get_recipe!(456)
      ** (Ecto.NoResultsError)

  """
  def get_recipe!(id), do: Repo.get!(Recipe, id)

  @doc """
  Creates a recipe.

  ## Examples

      iex> create_recipe(%{field: value})
      {:ok, %Recipe{}}

      iex> create_recipe(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_recipe(attrs \\ %{}) do
    %Recipe{}
    |> Recipe.changeset(attrs)
    |> Repo.insert()
  end

  # might use later with channels.
  def get_recipes!(attrs \\ %{}) do
    inter = Enum.reduce attrs, %{}, fn keyword, acc ->
      query = from(rec in Recipe, where: like(rec.ingredients, ^"%#{keyword}%"), select: rec)
      res = Repo.all(query)
      Enum.reduce res, acc, fn recipe, acc ->
        if Map.has_key?(acc, recipe.id) do
          acc
        else
          userquery = from(u in User, where: u.id == ^recipe.user_id, select: (fragment("concat(?, ' ', ?)", u.first_name, u.last_name)))
          us = Repo.all(userquery)
          [head | tail]= us
          res = %{"id" => recipe.id, "cuisine" => recipe.cuisine, "name" => recipe.name, "data" => recipe.data, "ingredients" => recipe.ingredients, 
          "description" => recipe.description, "diet" => recipe.diet, "dislikes" => recipe.dislikes, "like" => recipe.likes, "duration" => recipe.duration, "user" => head}
          Map.put(acc, recipe.id, res)
        end
      end
    end
    inter
  end

  def get_userrecipes!(id) do
    query = from(rec in Recipe, where: rec.user_id == ^id, select: rec)
    res = Repo.all(query)
    res
  end


  @doc """
  Updates a recipe.

  ## Examples

      iex> update_recipe(recipe, %{field: new_value})
      {:ok, %Recipe{}}

      iex> update_recipe(recipe, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_recipe(%Recipe{} = recipe, attrs) do
    recipe
    |> Recipe.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Recipe.

  ## Examples

      iex> delete_recipe(recipe)
      {:ok, %Recipe{}}

      iex> delete_recipe(recipe)
      {:error, %Ecto.Changeset{}}

  """
  def delete_recipe(%Recipe{} = recipe) do
    Repo.delete(recipe)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking recipe changes.

  ## Examples

      iex> change_recipe(recipe)
      %Ecto.Changeset{source: %Recipe{}}

  """
  def change_recipe(%Recipe{} = recipe) do
    Recipe.changeset(recipe, %{})
  end
end
