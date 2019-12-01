import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Jumbotron, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Card, CardHeader, CardImgOverlay, CardImg, CardBody, CardTitle, Collapse, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import _ from 'lodash';

import { Redirect } from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import Results from './recipesResult';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.channel = this.props.channel;
        this.state = {
            tags: [],
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.check = this.check.bind(this);
    }

    got_view(view) {
        this.props.dispatch({
            type: 'DBSEARCH_RESULTS',
            data: view.recipes.recipesRes,
        });
    }

    handleDelete(i) {
        const { tags } = this.state;
        let key = tags.filter((tag, index) => index == i);
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
        this.props.dispatch({
            type: 'CLEAR_RESULTS',
            data: key[0]["id"].charAt(0).toUpperCase() + key[0]["id"].slice(1)
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    check() {
        let keyword = this.state.tags;
        let keywords = [];
        for (let i = 0; i < keyword.length; i++) {
            keywords.push(keyword[i]["id"].charAt(0).toUpperCase() + keyword[i]["id"].slice(1));
        }
        this.channel.push("get_recipes", { searchWords: keywords })
            .receive("ok", this.got_view.bind(this));
    }

    render() {
        const { tags } = this.state;
        return (
            <div>
                     <Container>
                        <div className="welcoming_header">
                            <div>
                                <h1 className="welcoming"> Welcome To College Chef </h1>
                                <p className="welcoming_p">We take pride in helping college students be the master chefs in their kitchen.</p>
                            </div>
                        </div>
                            <ReactTags
                                className="react-tags"
                                inputFieldPosition="top"
                                tags={tags}
                                handleDelete={this.handleDelete}
                                handleAddition={this.handleAddition}
                                delimiters={delimiters}
                                placeholder="Separate ingredients with commas"
                                allowUnique={true} 
                                />

                        <div className="search_button_wrapper">
                            <Button className="search_button" variant="outline-dark" size="lg" onClick={() => this.check()}><FontAwesomeIcon icon="search"/> Search For Recipes</Button>
                        </div>

                    </Container>
                    <div>
                         <Recipes root={this.props} />
                    </div>
            </div>
        )

    }
}

function Recipes({ root }) {
    let recipes = root.recipes;
    if (Object.keys(recipes).length > 0) {
        let recipesRes = Object.values(recipes);
        return (
            <Results recipes={recipesRes} />
        );
    }
    else {
        return (
            <div>
            </div>
        );
    }

}

function state2props(state) {
    let st1 = Object.assign({}, state, { forms: state.forms, recipes: state.recipes });
    return st1;
}

export default connect(state2props)(Home);