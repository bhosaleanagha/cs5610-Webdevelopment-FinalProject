import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import {
  NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Col
} from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import Contact from './pages/contactus';
import About from './pages/aboutus'
import Footer from './pages/footer';
import store from './store';
import Register from './pages/register';
import Login from './pages/login';
import SearchResults from './pages/searchResults';
import Search from './pages/search';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function state2props(state) {
  return state.forms.search;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      isNavOpen: false,
    }

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  handleLogin(event) {
    this.toggleModal();
    alert("User name: " + this.username.value + " Password: " + this.password.value);
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar className="navbar-dark" expand="md">
            <div className="container">
              <NavbarBrand className="mr-auto" href="/"><img src='../images/logo.jpg' height="30" width="41" alt='Collegechef' /></NavbarBrand>
              <NavbarToggler onClick={this.toggleNav}><span className="fa fa-list"></span></NavbarToggler>
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Navbar>
                  <Nav className="mr-auto navbar-dark" navbar>
                    <Nav navbar>
                      <Nav.Item>
                        <NavLink to="/" exact activeClassName="active" className="nav-link">
                          Home
                         </NavLink>
                      </Nav.Item>
                      <Nav.Item>
                        <NavLink to="/aboutus" exact activeClassName="active" className="nav-link">
                          About Us
                        </NavLink>
                      </Nav.Item>
                      <Nav.Item>
                        <NavLink to="/contactus" exact activeClassName="active" className="nav-link">
                          Contact Us
                        </NavLink>
                      </Nav.Item>
                      <Col md="4">
                        <Session />
                      </Col>
                    </Nav>
                  </Nav>
                </Navbar>
              </Collapse>
            </div>
          </Navbar>
          <Switch>
            <Route exact path='/' component={() => <Search />} />
            <Route exact path='/contactus' component={() => <Contact />} />
            <Route exact path='/aboutus' component={() => <About />} />
            <Route exact path='/register' component={() => <Register />} />
            <Route exact path='/login' component={() => <Login />} />
            <Route exact path='/search' component={() => <SearchResults />} />
          </Switch>
          <Footer />
        </Router>
      </React.Fragment>
    );
  }
}


let Session = connect(({ session }) => ({ session }))(({ session, dispatch }) => {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <p className="text-light py-2">{session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/" exact activeClassName="active" className="nav-link" onClick={logout}>
            Logout
          </NavLink>
        </Nav.Item>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to="/login" exact activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/regiser" exact activeClassName="active" className="nav-link">
            Register
          </NavLink>
        </Nav.Item>
      </Nav>
    );
  }
});