defmodule Collegechef.Repo.Migrations.CreateRecipes do
  use Ecto.Migration

  def change do
    create table(:recipes) do
      add :cuisine, :string
      add :name, :string
      add :diet, :string
      add :duration, :integer
      add :description, :text
      add :likes, :integer
      add :dislikes, :integer
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

  end
end
