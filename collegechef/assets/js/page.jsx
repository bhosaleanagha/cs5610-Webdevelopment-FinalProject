import React ,{ useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { NavbarBrand, NavbarToggler, Collapse, Col} from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import logo from '../static/images/logo.jpg';
import {Form, Label, Input, FormGroup} from 'reactstrap';
import {submit_register} from './ajax';


import Contact from './pages/contactus';
import About from './pages/aboutus'
import Footer from './pages/footer';
import store from './store';
// import Register from './pages/register';
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

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
    }

    this.toggleNav = this.toggleNav.bind(this); // For Phone view
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  

  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar className="navbar-dark" expand="md">
            <div className="container">
              <NavbarBrand className="mr-auto"><img src={logo} height="40" width="50" alt='Collegechef' /></NavbarBrand>
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
            <Route exact path='/' component={Search} />
            <Route exact path='/login' component={Login} />
            {/* <Route exact path='/register' component={Register} /> */}


            <Route exact path='/contactus' component={() => <Contact />} />
            <Route exact path='/aboutus' component={() => <About />} />
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
          <Register store={store}/>
        </Nav.Item>
      </Nav>
    );
  }
});

// Should be a component
let Register = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  function handleRegister(event){
    event.preventDefault();
    console.log(event.target)
     
     store.dispatch({
      type: 'REGISTER_USER',
      data: formdata,
    })
    
    submit_register(formdata);
  }

  return (
    <div>
      <Button color="primary" onClick={toggle}>Register</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Sign Up</ModalHeader>
        <ModalBody>
              <Form onSubmit={handleRegister}>
                  <FormGroup>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input type="text" id="first_name" name="first_name" />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input type="text" id="last_name" name="last_name"/>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input type="text" id="email" name="email"/>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input type="password" id="password" name="password"/>
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="confirmed_password">Comfirmed Password</Label>
                      <Input type="password" id="confirmed_password" name="confirmed_password"/>
                  </FormGroup>
                  
                  <Button color="primary" >Register</Button>
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
              </Form>
        </ModalBody>
      </Modal>
    </div>
  );    
}