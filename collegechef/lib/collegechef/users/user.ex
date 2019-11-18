defmodule Collegechef.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :address, :string
    field :age, :integer
    field :email, :string
    field :name, :string
    field :password, :string, virtual: true
    field :password_hash, :string

    has_many :recipes, Collegechef.Recipes.Recipe

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :age, :address])
    |> validate_required([:name, :email])
    |> hash_password()
    |> unique_constraint(:email)
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    change(cset, Argon2.add_hash(pw))
  end
end
