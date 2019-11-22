defmodule CollegechefWeb.SessionController do
    use CollegechefWeb, :controller

    action_fallback CollegechefWeb.FallbackController

    alias Collegechef.Users

    def create(conn, %{"email" => email, "password" => password}) do
      user = Users.authenticate_user(email, password)
      if user do
        token = Phoenix.Token.sign(conn, "session", user.id)
        resp = %{token: token, user_id: user.id, user_fname: user.first_name, user_lname: user.last_name, user_email: user.email}
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
