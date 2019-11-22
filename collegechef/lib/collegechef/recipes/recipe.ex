defmodule Collegechef.Recipes.Recipe do
  use Ecto.Schema
  import Ecto.Changeset

  schema "recipes" do
    field :cuisine, :string
    field :description, :string
    field :diet, :string
    field :dislikes, :integer
    field :duration, :integer
    field :likes, :integer
    field :name, :string
    field :data, :string
    field :ingredients, :string

    belongs_to :user, Collegechef.Users.User

    timestamps()
  end

  @doc false
  def changeset(recipe, attrs) do
    recipe
    |> cast(attrs, [:cuisine, :name, :diet, :duration, :description, :likes, :dislikes, :ingredients, :user_id])
    |> validate_required([:cuisine, :name, :diet, :duration, :description, :likes, :dislikes, :ingredients, :user_id])
  end
end
