defmodule CollegechefWeb.Router do
  use CollegechefWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", CollegechefWeb do
    pipe_through :ajax

    resources "/users", UserController
    resources "/recipes", RecipeController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
    resources "/ingredients", IngredientController, except: [:new, :edit]
    resources "/dbsearch", DBSearchController, only: [:create], singleton: true

  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CollegechefWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index

  end

  # Other scopes may use custom stacks.
  # scope "/api", CollegechefWeb do
  #   pipe_through :api
  # end
end
