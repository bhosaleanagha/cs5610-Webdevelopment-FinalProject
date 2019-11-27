import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Label, Col } from 'reactstrap';
import { Control, Form, Errors, LocalForm } from 'react-redux-form';
import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import { Redirect } from 'react-router';

import { get_ingredients } from '../ajax';
import { add_ingredient } from '../ajax';

import { edit_recipe_with_picture } from '../ajax';
import { edit_recipe_without_picture } from '../ajax';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));


function state2props(state, props) {
  let id = parseInt(props.id);
  let recipe = state.userrecipes.get(id);
  return { id: id, data: recipe.data, cuisine: recipe.cuisine, diet: recipe.diet, name: recipe.name, description: recipe.description, duration: recipe.duration, ingredients: recipe.ingredients };
}

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.cuisine = props.cuisine;
    this.diet = props.diet;
    this.name = props.name;
    this.duration = props.duration;
    this.ingredients = props.ingredients;
    this.data = props.data;
    this.description = props.description;

    this.state = {
      tags: [],
      redirect: "",
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.add = this.add.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDelete(i) {
    const { tags } = this.state;
    let key = tags.filter((tag, index) => index == i);
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
    this.props.dispatch({
      type: 'CLEAR_INGR_RESULTS',
      data: key[0]["id"]
    });
  }

  handleAddition(tag) {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  redirect(path) {
    this.setState({
      redirect: path,
    });
  }

  add() {
    let keyword = this.state.tags;
    //let keywords = [];
    for (let i = 0; i < keyword.length; i++) {
      let ingr = keyword[i]["id"];
      ingr = ingr.charAt(0).toUpperCase() + ingr.slice(1)
      this.props.dispatch({
        type: 'ADD_NEW_INGREDIENT',
        data: { name: ingr }
      });
      add_ingredient(this);
    }
  }

  handleSubmit(values) {
    let data = this.data;
    let ingr = this.ingredients;
    let tags = this.state.tags;
    let tagRes = "";
    if (tags.length < 0) {
      for (let i = 0; i < tags.length; i++) {
        let ingre = tags[i]["id"];
        tagRes = tagRes + ", " + ingre.charAt(0).toUpperCase() + ingre.slice(1)
      }
    }
    if (values.hasOwnProperty('ingredients')) {
      ingr = values.ingredients;
      ingr = ingr.join(', ');
      if (tags.length > 0) {
        ingr = ingr + tagRes;
        ingr = this.ingredients + ", " + ingr;
      }
      else {
        ingr = this.ingredients + ", " + ingr;
      }
    }
    else {
      if (tags.length > 0) {
        ingr = this.ingredients + ", " + tagRes;
      }
    }
    if (values.hasOwnProperty('cuisine')) {
      this.cuisine = values.cuisine;
    }
    if (values.hasOwnProperty('diet')) {
      this.diet = values.diet;
    }
    if (values.hasOwnProperty('duration')) {
      this.duration = values.duration;
    }
    if (values.hasOwnProperty('description')) {
      this.description = values.description;
    }

    if (values.hasOwnProperty('data')) {
      data = values.data;
      edit_recipe_with_picture(this.id, this.cuisine, this.description, this.diet, this.duration, data, ingr, this)
    }
    else {
      edit_recipe_without_picture(this.id, this.cuisine, this.description, this.diet, this.duration, ingr, this)
    }
    //call edit here
    //id,cuisine, description, diet, duration, name, data, ingredients, form
    //edit_recipe(this.id, values.cuisine, values.description, values.diet, values.duration, values.name, data, ingr, this);
  }

  render() {
    const { tags } = this.state;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <div className="row row-content">
          <div className="col-12">
            <h3>Add your own Recipe!</h3>
            <div className="col-12 col-md-9">
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="name" md={3}>Recipe Name</Label>
                  <Col md={9}>
                    <Label id="name" md={2}>{this.name}</Label>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="data" md={3}>Upload picture:</Label>
                  <Col md={8}>
                    <Control.file model=".data" id="data" name="data"
                      className="form-control"
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="cuisine" md={3}>Cuisine (Currently selected: {this.cuisine})</Label>
                  <Col md={{ size: 3 }}>
                    <Control.select model=".cuisine" className="form-control" name="cuisine" >
                      <option> </option>
                      <option>Italian</option>
                      <option>Indian</option>
                      <option>French</option>
                      <option>American</option>
                      <option>Korean</option>
                      <option>Chinese</option>
                      <option>Thai</option>
                      <option>Mexican</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="diet" md={3}>Diet (Currently selected: {this.diet})</Label>
                  <Col md={{ size: 3 }}>
                    <Control.select model=".diet" className="form-control" name="diet" >
                      <option> </option>
                      <option>Vegetarian</option>
                      <option>Non-Vegetarian</option>
                      <option>Vegan</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="duration" md={3}>Duration in minutes (Currently {this.duration})</Label>
                  <Col md={9}>
                    <Control.text model=".duration" id="duration" name="duration"
                      placeholder="Duration to cook"
                      className="form-control"
                      validators={{
                         maxLength: maxLength(5), isNumber
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".duration"
                      show="touched"
                      messages={{
                        maxLength: 'Can be at most 5 digits',
                        isNumber: 'Must be a number'
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label md={3}>Current Ingredients: {this.ingredients}</Label>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="addIngredient" md={3}>Add Ingredient:</Label>
                  <Col md={{ size: 3 }}>
                    <Control.select model=".ingredients" className="form-control" name="ingredients" multiple={true}>
                      <IngredientList />
                    </Control.select>
                  </Col>
                </Row>
                <Row>
                  <Col md={{ size: 10, offset: 2 }}>
                    <ReactTags
                      tags={tags}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      delimiters={delimiters}
                      placeholder="Add New Ingredients"
                      allowUnique={true} />
                  </Col>
                  <div className="col-3 col-md-3">
                    <Button variant="primary" onClick={() => this.add()}>Add</Button>
                  </div>
                </Row>
                <Row>
                  <Label md={3}>Current Preparation Steps:</Label>
                  <Col md={9}>
                    {this.description}
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="procedure" md={3}>Preparation Steps:</Label>
                  <Col md={9}>
                    <Control.textarea model=".description" className="form-control" id="description" name="description" rows="12">

                    </Control.textarea>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10, offset: 3 }}>
                    <Button type="submit" color="primary">Edit Recipe</Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </div>
        </div >
      </div >
    );
  }
}

let IngredientList = connect(({ ingredients }) => ({ ingredients }))(({ ingredients }) => {
  if (ingredients.size == 0) {
    get_ingredients();
  }

  let ingredientsList = _.map([...ingredients], ([_, ingredient]) => {
    return <option key={ingredient.id} value={ingredient.name}>{ingredient.name}</option>;
  });
  return ingredientsList;
});

export default connect(state2props)(EditRecipe);