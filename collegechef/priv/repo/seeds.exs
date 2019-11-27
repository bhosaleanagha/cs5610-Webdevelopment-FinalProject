# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Collegechef.Repo.insert!(%Collegechef.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Collegechef.Repo
alias Collegechef.Recipes.Recipe
alias Collegechef.Users.User
alias Collegechef.Ingredients.Ingredient


pw = Argon2.hash_pwd_salt("password12345")

alice = Repo.insert!(%User{first_name: "Alice", last_name: "Anderson", email: "alice@example.com", password_hash: pw})
Repo.insert!(%Ingredient{name: "Rice"})
Repo.insert!(%Ingredient{name: "Onions"})
Repo.insert!(%Ingredient{name: "Tomatoes"})
Repo.insert!(%Ingredient{name: "Brown Rice"})
Repo.insert!(%Ingredient{name: "Jasmine Rice"})
Repo.insert!(%Ingredient{name: "Green Peppers"})
Repo.insert!(%Ingredient{name: "Yellow Peppers"})
Repo.insert!(%Ingredient{name: "Red Peppers"})
Repo.insert!(%Ingredient{name: "Orange Peppers"})
Repo.insert!(%Ingredient{name: "Garlic"})
Repo.insert!(%Ingredient{name: "Ginger"})
Repo.insert!(%Ingredient{name: "Oil"})
Repo.insert!(%Ingredient{name: "Water"})
Repo.insert!(%Ingredient{name: "Milk"})
Repo.insert!(%Ingredient{name: "Wheat Flour"})
Repo.insert!(%Ingredient{name: "All Purpose Flour"})
Repo.insert!(%Ingredient{name: "Sugar"})
Repo.insert!(%Ingredient{name: "Salt"})
Repo.insert!(%Ingredient{name: "Pepper"})
