import React from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import { Container } from 'reactstrap';
import { Button} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import {submit_powersearch} from '../ajax';

import { connect } from 'react-redux';
import _ from 'lodash';

class PowerSearch extends React.Component {
    constructor(props){
        super(props);
        this.channel = this.props.channel;
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.props.dispatch({
          type: 'CHANGE_POWER_SEARCH',
          data: data,
        });
      }


    render() {            
        return (
                <Container >
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h6>Search through multiple recipes with the ingredients in your friedge.</h6>
                        </div>
                    </div>
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="apples,flour,sugar"
                        onChange={(ev) => this.changed({ingredients: _.lowerCase(ev.target.value)})}
                        />
                        <InputGroup.Append>
                        <Button variant="outline-primary" onClick={()=> submit_powersearch(this)}>Search For Recipes</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <div className="recipes_cards">
                    </div>
                </Container>
        )
    }
}

const DisplayRecipeCard = ({recipes}) => {
    return (
      <div>
        <Card>
          {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
};

function state2props(state) {
    return state;
}

export default connect(state2props)(PowerSearch);