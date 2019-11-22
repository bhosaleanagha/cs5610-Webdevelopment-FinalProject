import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, useLocation} from "react-router-dom";
import { Navbar, Nav, Col, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import store from './store';
import Register from './components/register'
import Login from './components/login';
import Profile from './components/profile';
import Home from './components/home';


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
       <Navbar bg="dark" variant="dark" expand="md">
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
            <Session />
          </Col>
       </Navbar>
       <ModalSwitch channel={this.channel}/>
      </Router>
    )
  }
}

function ModalSwitch(props) {

    let location = useLocation();
    let background = location.state && location.state.background;
  
    return (
      <div>
        <Switch location={background || location}>
          <Route exact path='/' component={() => <Home channel={props.channel}/>}/>
          <Route exact path='/about' component={Home}/>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
        </Switch>
        {background && <Route path="/login" component={Login} />}
        {background && <Route path="/register" component={Register} />}
      </div>
    )
  }

let Session = connect(({ session }) => ({ session }))(({ session, dispatch }) => {
  let location = useLocation();

  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    dispatch({
      type: 'LOG_OUT',
    });
  }

  function redirectToProfile(ev){
    ev.preventDefault();
  }

  if (session) {
    return (
      <Nav>
        <Nav.Item>
          <NavLink to={"/"} exact activeClassName="active" className="nav-link">
            Search Recipes By Ingredients
          </NavLink>
        </Nav.Item>
        <Dropdown as={ButtonGroup}>
          <Button variant="outline-light">{'Chef ' + session.user_fname + ' ' + session.user_lname}</Button>
          <Dropdown.Toggle split variant="outline-light" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={redirectToProfile}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={console.log("My Recipes")}>My Recipes</Dropdown.Item>
            <Dropdown.Item onClick={console.log("My Recipes")}>Add Recipes</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>
                Logout
            </Dropdown.Item>
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
