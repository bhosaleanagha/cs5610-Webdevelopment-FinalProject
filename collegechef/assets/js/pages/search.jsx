import React from 'react';
import { Alert, Button, Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';

import { Redirect } from 'react-router';
import { get_recipes } from '../ajax';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : null,
        }
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_WORDS',
            data: data,
        });
    }

    redirect(path) {
        this.setState({
          redirect: path,
        });
      }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Jumbotron fluid>
                <Container >
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>College Chef</h1>
                            <p>We take pride in helping the college students be the master chefs in their kitchen by using the ingredients available in their fridge.</p>
                        </div>
                    </div>
                    <Col md="8">
                    </Col>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />


                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="What's in your fridge?" controlid="search" onChange={
                                (ev) => this.changed({ searchWords: ev.target.value })} />
                        <InputGroup.Append>
                            <Button variant="info" onClick={() => get_recipes(this)}>Go!</Button>
                        </InputGroup.Append>
                    </InputGroup>

                </Container>

                <br />
                <br />

            </Jumbotron>
        )
    }
}

function state2props(state) {
    return state.forms.search;
}

export default connect(state2props)(Search);