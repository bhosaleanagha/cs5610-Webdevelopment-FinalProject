defmodule CollegechefWeb.DBSearchController do
    use CollegechefWeb, :controller
  
    action_fallback CollegechefWeb.FallbackController
  
    alias Collegechef.Recipes
  
    def create(conn, %{"searchWords" => searchWords}) do
      recipes = Enum.each searchWords, fn recipe ->
        Recipes.get_recipes!(recipe)
      end
      if recipes do
        resp = %{recipes: recipes}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      else
        resp = %{errors: ["Fetch failed"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unauthorized, Jason.encode!(resp))
      end
    end

  end