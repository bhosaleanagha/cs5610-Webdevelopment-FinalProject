defmodule CollegechefWeb.PageController do
  use CollegechefWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
