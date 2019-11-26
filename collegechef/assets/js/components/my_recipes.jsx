import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardImgOverlay, CardHeader, CardBody, CardTitle, Button, Row, Collapse } from 'reactstrap';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image from '../../static/images/no-image-icon.jpg';

import { get_recipes } from '../ajax';


function state2props(state) {
  return { userrecipes: state.userrecipes };
}

class UserRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  //create functions for edit and delete.

  render() {
    //get_recipes();
    return (
      <div>
          <MyRecipes />
      </div>
    );
  }
}


let MyRecipes = connect(({ userrecipes }) => ({ userrecipes }))(({ userrecipes, dispatch }) => {
  if (userrecipes.size == 0) {
    get_recipes();
  }

  let res = _.map([...userrecipes], ([_, dish]) => {
    return (
      <RenderMenuItem key={dish.id} dish={dish} dispatch={dispatch} />
    )
  })
  if(res.length > 0){
  return (
    <Row>
      {res}
    </Row>);
  }
  else{
    return(
      <div>No recipes added by you! Go ahead and add one.</div>
    )
  }
})

class RenderMenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      redirect : null,
    }
    this.dish = props.dish;
    this.toggle = this.toggle.bind(this);
    //this.edit = this.edit.bind(this);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  edit(e){
    let res = "recipes/" + this.dish.id;
    this.setState({redirect: res });
  }

  delete(e){
    let res = "recipes/delete/" + this.dish.id;
    this.setState({redirect: res });
  }

  render() {
    console.log(this.state);
    if (this.dish.data != null) {
      return (
        <Card key={this.dish.id} className="col-4">
          <CardHeader>
            <CardImg width="100%" src={this.dish.data} alt={this.dish.name} />
              <CardTitle id={this.dish.id}>
                {this.dish.name}
              </CardTitle>
            <Button className="btn btn-warning" md={{ offset: 2 }} onClick={this.toggle}>Details</Button>
          </CardHeader>

          <Collapse isOpen={this.state.isOpen}>
            <CardBody id={this.dish.id}>
              <ul>
                <li>Cuisine: {this.dish.cuisine}</li>
                <li>Duration: {this.dish.duration}</li>
                <li>Igredients: {this.dish.ingredients}</li>
                <li>Diet: {this.dish.diet}</li>
                <li>Procedure:
                <p className="d-none d-sm-block">{this.dish.description}</p>
                </li>
              </ul>
              <p><FontAwesomeIcon icon="heart" />{this.dish.likes} {' '} <FontAwesomeIcon icon="heart-broken" />{this.dish.dislikes}</p>
              <p>
                <Button className="btn btn-warning" onClick={this.edit.bind(this)}>Edit</Button>
                <Button className="btn btn-danger" onClick={this.delete.bind(this)}>Delete</Button></p>
            </CardBody>
          </Collapse>
        </Card>
      );
    }
    else {
      return (
        <Card key={this.dish.id} className="col-4">
          <CardHeader>
          <CardImg width="100%" height="75%" src={image} alt={this.dish.name} />
            <CardTitle id={this.dish.id}>
              {this.dish.name}
            </CardTitle>
            <Button className="btn btn-warning" md={{ offset: 2 }} onClick={this.toggle}>Details</Button>
          </CardHeader>
          <Collapse isOpen={this.state.isOpen}>
            <CardBody>
              <ul>
                <li>Cuisine: {this.dish.cuisine}</li>
                <li>Duration: {this.dish.duration}</li>
                <li>Igredients: {this.dish.ingredients}</li>
                <li>Diet: {this.dish.diet}</li>
                <li>Procedure:
                <p className="d-none d-sm-block">{this.dish.description}</p>
                </li>

              </ul>
              <p><FontAwesomeIcon icon="heart" />{this.dish.likes} {' '} <FontAwesomeIcon icon="heart-broken" />{this.dish.dislikes}</p>
              <p>
                <Button className="btn btn-warning" onClick={this.edit.bind(this)}>Edit</Button>  {'            '}
                <Button className="btn btn-danger" onClick={this.delete.bind(this)}>Delete</Button></p>
            </CardBody>
          </Collapse>
        </Card>
      );
    }
  }
}


  /* function RenderMenuItem({ dish, dispatch }){
    let [isOpen, setIsOpen] = useState(false);
  
    let toggle = () => setIsOpen(!isOpen);
  
    let edit = () => dispatchEdit(console.log("Edit"));
  
    if (dish.data != null) {
      return (
        <Card key={dish.id} className="col-4">
          <CardHeader>
            <CardImg width="100%" src={dish.data} alt={dish.name} />
            <CardImgOverlay className="ml-5">
              <CardTitle id={dish.id}>
                {dish.name}
              </CardTitle>
            </CardImgOverlay>
            <Button className="btn btn-warning" md={{offset:2}} onClick={toggle}>Details</Button>
          </CardHeader>
  
          <Collapse isOpen={isOpen}>
            <CardBody id={dish.id}>
              <ul>
                <li>Cuisine: {dish.cuisine}</li>
                <li>Duration: {dish.duration}</li>
                <li>Igredients: {dish.ingredients}</li>
                <li>Diet: {dish.diet}</li>
                <li>Procedure:
                  <p className="d-none d-sm-block">{dish.description}</p>
                </li>
              </ul>
              <FontAwesomeIcon icon="heart" />{dish.likes} {' '} <FontAwesomeIcon icon="heart-broken" />{dish.dislikes}
              <Button className="btn btn-warning" onClick={edit}>Edit</Button>
            </CardBody>
          </Collapse>
        </Card>
      );
    }
    else {
      return (
        <Card key={dish.id} className="col-4">
          <CardHeader>
              <CardTitle id={dish.id}>
                {dish.name}
              </CardTitle>
            <Button className="btn btn-warning" md={{offset:2}} onClick={toggle}>Details</Button>
          </CardHeader>
          <Collapse isOpen={isOpen}>
            <CardBody>
              <ul>
                <li>Cuisine: {dish.cuisine}</li>
                <li>Duration: {dish.duration}</li>
                <li>Igredients: {dish.ingredients}</li>
                <li>Diet: {dish.diet}</li>
                <li>Procedure:
                  <p className="d-none d-sm-block">{dish.description}</p>
                </li>
  
              </ul>
              <FontAwesomeIcon icon="heart" />{dish.likes} {' '} <FontAwesomeIcon icon="heart-broken" />{dish.dislikes}
              <Button className="btn btn-warning" onClick={edit}>Edit</Button>
            </CardBody>
          </Collapse>
        </Card>
      );
    }
  }
   */
  export default connect(state2props)(UserRecipes);