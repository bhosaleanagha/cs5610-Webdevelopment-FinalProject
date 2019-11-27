import React, {useState} from 'react';
import {Card, CardImg, CardTitle, CardText, CardDeck,CardSubtitle, CardBody, Col} from 'reactstrap';
import { Button, Container, Modal, ModalHeader, ModalTitle,ModalBody,ModalFooter} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { connect } from 'react-redux';

import RecipeModal from './recipe_modal';
import _ from 'lodash';

class PowerSearch extends React.Component {
    constructor(props){
        super(props);
        this.channel = this.props.channel;
        this.state = {
          ingredients: "",
          recipesResult: {}
        }
        this.submit_powersearch = this.submit_powersearch.bind(this);
    }

    got_view(view) {
        this.props.dispatch({
            type: 'APISEARCH_RESULTS',
            data: view.recipes.recipesRes,
        });
        this.redirect(view.recipes.redirect);
        this.setState({
          recipesResult: view.recipes
        })
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    setIngredients(ev){
      this.setState({ingredients: ev.replace(/\s/g, "")})
    }

    submit_powersearch() {
      this.channel.push("get_api_recipes", { searchWords: this.state.ingredients })
          .receive("ok", this.got_view.bind(this));
    }

    render() {            
        return (
          <div>
                <Container >
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h6>Search through multiple recipes with the ingredients in your friedge.</h6>
                        </div>
                    </div>
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="apples,flour,sugar"
                        onChange={(ev) => this.setIngredients(ev.target.value)}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-primary" onClick={()=> this.submit_powersearch()}>Search For Recipes</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <div className="recipes_cards">
                    </div>
                </Container>
                <DisplayRecipeCard recipeResult={this.state.recipesResult} root={this.props}/>
          </div>
        )
    }
}


const DisplayRecipeCard = ({root,recipeResult}) => {
  let recipes = root.recipes;

  let recipesCards = Object.values(recipes).map((recipe,index) => {
    return (
      <Col key={index} sm="3">
        <Card>
          <CardImg top width="256px" height="186px" src={recipe.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{recipe.name}</CardTitle> 
            <RecipeModal recipeInfo={recipe} />
          </CardBody>
        </Card>
      </Col>
    )
  });

    return (
      <Container>
        <CardDeck>
            {recipesCards}
        </CardDeck>
      </Container>
    )
};

function state2props(state) {
  let st1 = Object.assign({}, state, { forms: state.forms, recipes: state.recipes });
  return st1;
}

export default connect(state2props)(PowerSearch);