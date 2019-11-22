import React from 'react';
import { Alert, Button, Container, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Redirect } from 'react-router';
//import { get_recipes } from '../ajax';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.channel = this.props.channel;
        this.state = {
            redirect: "",
            tags: [],
        }
        this.channel
        .join()
        .receive("ok", this.got_view.bind(this))
        .receive("error", resp => { console.log("Unable to join", resp); });
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.check = this.check.bind(this);
        //this.changed = this.changed.bind(this);
    }

    got_view(view) {
        this.props.dispatch({
          type: 'DBSEARCH_RESULTS',
          data: view.recipes.recipesRes,
        });
        this.redirect(view.recipes.redirect);
      }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    /*
    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_WORDS',
            data: data,
        });
    }
    */

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    check() {
        //console.log("Hello");
        let keyword = this.state.tags;
        let keywords = [];
        for (let i = 0; i < keyword.length; i++) {
            keywords.push(keyword[i]["id"]);
        }
        //this.changed({ searchWords: keywords });
        //get_recipes(this);
        this.channel.push("get_recipes", {searchWords: keywords})
        .receive("ok", this.got_view.bind(this));
    }

    render() {
        const { tags } = this.state;
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

                    <br />
                    <br />
                    <Col md="8">
                    </Col>
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                    <div className="row">
                        <div className="col-9 col-sm-12 col-md-9">
                            <ReactTags
                                tags={tags}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                delimiters={delimiters}
                                placeholder="What's in your fridge?"
                                allowUnique={true} />
                        </div>
                        <div className="col-3 col-md-3">
                            <Button variant="info" onClick={() => this.check()}>Go!</Button>
                        </div>
                    </div>
                </Container>
            </Jumbotron>
        )

    }
}

function state2props(state) {
    return state.forms.search;
}

export default connect(state2props)(Search);