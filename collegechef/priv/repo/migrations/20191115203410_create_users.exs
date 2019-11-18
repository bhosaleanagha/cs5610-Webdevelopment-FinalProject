defmodule Collegechef.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :age, :integer
      add :address, :text
      add :password_hash, :string

      timestamps()
    end

  end
end
