defmodule Collegechef.Repo do
  use Ecto.Repo,
    otp_app: :collegechef,
    adapter: Ecto.Adapters.Postgres
end
