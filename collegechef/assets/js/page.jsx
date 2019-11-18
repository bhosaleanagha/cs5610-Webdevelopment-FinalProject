import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Button, Container, Col, Form, InputGroup, Jumbotron, Navbar, Nav } from 'react-bootstrap';

export default function init_page(root) {
  ReactDOM.render(<Page />, root);
}

function goSearch() {
	return <Redirect to="/search" />
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Nav>
          <Nav.Item>
            <NavLink to="/" exact activeClassName="active" className="nav-link">
              Homes
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
      	
      	 <Jumbotron>
      	
      	 <Container >
      	 <Col md="8">
      	 </Col> 
      	 <br/>
      	 <br/>
      	 <br/>
      	 <br/>
      	 <br/>
      	 <br/>
      	 
      	 
      	 <InputGroup className="mb-3">
      	 	<Form.Control
     	 		placeholder="What's in your fridge?" controlid="search"/>
    		<InputGroup.Append>
      			<Button variant="info" href="/search">Go!</Button>
    		</InputGroup.Append>
  		</InputGroup>
  		
       	</Container>
       	
       	<br/>
      	 <br/>
      	 
       	</Jumbotron>
       	    </Route>

        <Route exact path="/users">
          <h1>Users</h1>
        </Route>
        
        <Route exact path="/search">
          <h1></h1>
        </Route>
      </Switch>
    </Router>
  );
}
