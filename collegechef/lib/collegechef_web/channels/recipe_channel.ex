defmodule CollegechefWeb.RecipesChannel do
    use CollegechefWeb, :channel

    alias Collegechef.GetRecipes

    def join("recipes:" <> name, payload, socket) do
        if authorized?(payload) do
            recipes = GetRecipes.new()
            socket = socket
            |> assign(:recipes, recipes)
            |> assign(:name, name)
            {:ok, %{"join" => name, "recipes" => GetRecipes.client_view(recipes)}, socket}
        else
            {:error, %{reason: "unauthorized"}}
        end
    end

    def handle_in("get_recipes", %{"searchWords" => searchWords}, socket) do
        name = socket.assigns[:name]
        recipes = GetRecipes.get_recipes(socket.assigns[:recipes], searchWords)
        socket = assign(socket, :recipes, recipes)
        {:reply, {:ok, %{ "recipes" => GetRecipes.client_view(recipes)}}, socket}
    end

    defp authorized?(_payload) do
        true
    end
end