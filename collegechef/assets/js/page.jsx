import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function init_page(root) {
  ReactDOM.render(<Page />, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <NavLink to="/" exact activeClassName="active" className="nav-link">
              Home
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/users" exact activeClassName="active" className="nav-link">
              Users
            </NavLink>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <h1>Welcome To College Chef</h1>
        </Route>

        <Route exact path="/users">
          <h1>Users</h1>
        </Route>
      </Switch>
    </Router>
  );
}