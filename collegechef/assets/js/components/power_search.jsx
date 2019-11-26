import React, { useState } from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import { Container } from 'reactstrap';
import { Button} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { connect } from 'react-redux';
import _ from 'lodash';
import Results from './recipesResult';

class PowerSearch extends React.Component {
    constructor(props){
        super(props);
        this.channel = this.props.channel;
        this.state = {
          ingredients: ""
        }
        this.submit_powersearch = this.submit_powersearch.bind(this);
    }

    got_view(view) {
        this.props.dispatch({
            type: 'APISEARCH_RESULTS',
            data: view.recipes.recipesRes,
        });
        this.redirect(view.recipes.redirect);
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    setIngredients(ev){
      this.setState({ingredients: ev})
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
                <DisplayRecipeCard root={this.props}/>
          </div>
        )
    }
}


const DisplayRecipeCard = ({root}) => {
  let recipes = root.recipes;
  
  let allRecipes = Object.values(recipes).map((recipe) => {
    return (
        <Card key={recipe.id}>
          <CardImg top width="50%" height="50%" src={recipe.image} alt="Card image cap" />
          <CardBody>
            <CardTitle>{recipe.name}</CardTitle> 
            <CardText>{recipe.ingredients[0].originalString}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
    )
  });
  
  if (Object.keys(recipes).length > 0){
    return (
      <div>
          {allRecipes}
      </div>
    )
  } else {
    return (
      <div></div>
   );
  }
};

function state2props(state) {
  let st1 = Object.assign({}, state, { forms: state.forms, recipes: state.recipes });
  return st1;
}

export default connect(state2props)(PowerSearch);