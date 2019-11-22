defmodule CollegechefWeb.DBSearchController do
    use CollegechefWeb, :controller
  
    action_fallback CollegechefWeb.FallbackController
  
    alias Collegechef.Recipes
  
    def create(conn, %{"searchWords" => searchWords}) do
      recipes = Recipes.get_recipes!(searchWords)
      if(recipes) do
        resp = recipes
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:created, Jason.encode!(resp))
      else
        resp = %{errors: ["Authentication Failed"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(:unauthorized, Jason.encode!(resp))
      end
    end
  end