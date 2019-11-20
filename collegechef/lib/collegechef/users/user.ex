defmodule Collegechef.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    has_many :recipes, Collegechef.Recipes.Recipe

    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
<<<<<<< HEAD
    |> cast(attrs, [:email, :name, :password])
=======
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
>>>>>>> e24ebbf2be1f1de3676964f93850f5ae84c1c93f
    |> hash_password()
    |> validate_required([:email, :name, :password_hash])
  end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    change(cset, Argon2.add_hash(pw))
  end
end
