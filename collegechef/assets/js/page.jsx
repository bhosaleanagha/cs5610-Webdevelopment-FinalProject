import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

import { BrowserRouter as Router, Switch, Route, Link, NavLink, useLocation} from "react-router-dom";
import { Navbar, Nav, Col, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';


import store from './store';

import Home from './components/home';
import Profile from './components/profile';
import Register from './components/register'
import Login from './components/login';
// import UserRecipes from './components/my_recipes';
import PowerSearch from './components/power_search';
import AddRecipes from './components/addRecipes';
import UserRecipes from './components/my_recipes';
import NotFound from './components/notfound';
import EditRecipe from './components/edit_recipe';
import Footer from './components/footer';


// import Register from './pages/register';
// import Login from './pages/login';
// import SearchResults from './pages/searchResults';
// import Search from './pages/search';

export default function init_page(root, channel) {
  let tree = (
    <Provider store={store}>
      <Page channel = {channel} />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;

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
  
  render() {
    return(
      <Router>
       <Navbar className="customNav" expand="md">
          <Col md="8">
            <Nav>
              <Nav.Item>
                <NavLink to="/" exact activeClassName="active" className="nav-link">
                  Home
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/about" exact activeClassName="active" className="nav-link">
                  About
                </NavLink>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md="4">
            <Session props={this.props}/>
          </Col>
       </Navbar>
       <ModalSwitch channel={this.channel}/>
       <Footer />
      </Router>
    )
  }
}

function ModalSwitch(props) {

    let location = useLocation();
    let background = location.state && location.state.background;

    let LoginUserRoutes;

    if (localStorage.length > 0) {
      LoginUserRoutes = (
        <React.Fragment>
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/add-recipes' component={AddRecipes} />
          <Route exact path='/power-search' component={() => <PowerSearch channel={props.channel}/>} />
          <Route exact path="/recipes/:id" render={
          (props) =>
            <EditRecipe id={props.match.params.id} />
        } />
          <Route path='/my-recipes' component={UserRecipes} /> 
          </React.Fragment>
      )   
    } 
  
    return (
      <div>
        <Switch location={background || location}>
          <Route exact path='/' component={() => <Home channel={props.channel}/>}/>
          <Route exact path='/about' component={Home}/>
          <Route path='/profile' component={Profile} />
          <Route path='/add-recipes' component={AddRecipes} />
          <Route path='/power-search' component={PowerSearch} />
          <Route path='/my-recipes' component={UserRecipes} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          {LoginUserRoutes}
          <Route component={NotFound}/>
        </Switch>
        {background && <Route path="/login" component={Login} />}
        {background && <Route path="/register" component={Register} />}
      </div>
    )
  }

let Session = connect(({ session }) => ({ session }))(({ session, dispatch }) => {
  let location = useLocation();

  function logout() {
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
    <Redirect to="/"></Redirect>
    window.location.reload(false);
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to={"/power-search"} exact activeClassName="active" className="nav-link">
            Power Search
          </NavLink>
        </Nav.Item>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle split variant="outline-light" id="dropdown-split-basic">{'Chef ' + session.user_fname + ' ' + session.user_lname}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/my-recipes">My Recipes</Dropdown.Item>
            <Dropdown.Item as={NavLink} to="/add-recipes">Add Recipes</Dropdown.Item>
            <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/" onClick={logout} >Logout </Dropdown.Item>            
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    );
  }
  else {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to={{pathname: `/login`, state: { background: location }}} exact activeClassName="active" className="nav-link">
            Login
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to={{pathname: `/register`, state: { background: location }}} exact activeClassName="active" className="nav-link">
            Register
          </NavLink>
        </Nav.Item>
      </Nav>
    );
  }
})
