import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { Card, CardHeader, CardImgOverlay, CardImg, CardBody, CardTitle, Collapse, Row } from 'reactstrap';
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
                <Jumbotron className="jumbo" >
                    <Container >
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>College Chef</h1>
                                <p>We take pride in helping the college students be the master chefs in their kitchen.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-9 col-sm-12 col-md-9">
                                <ReactTags
                                    tags={tags}
                                    handleDelete={this.handleDelete}
                                    handleAddition={this.handleAddition}
                                    delimiters={delimiters}
                                    placeholder="List Your Ingredients"
                                    allowUnique={true} />
                            </div>
                            <div className="col-3 col-md-3">
                                <Button variant="info" onClick={() => this.check()}>Search For Recipes</Button>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
                <Recipes root={this.props}/>
            </div>
        )

    }
}

function Recipes({ root }) {
    let recipes = root.recipes;
    if (Object.keys(recipes).length > 0) {
        let recipesRes = Object.values(recipes);
        return(
                <Results recipes={recipesRes}/>
        );

        //const dishes = recipesRes.map((rec) => {
            /*
            if (Object.keys(rec).length > 0) {
                return (
                    <div key={rec.id} className="col-12 col-md-5 m-1">
                        <RenderMenuItem dish={rec} />
                    </div>
                );
            }
            else {
                return;
            }
            */
        //});
        //return dishes;
    }
    else {
        return (
            <div></div>
        );
    }

}

const RenderMenuItem = ({ dish }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    let did = dish.id.toString();
    if (dish.data != null) {
        return (
            <Card key={dish.id}>
                <CardHeader>
                    <CardImg width="100%" src={dish.data} alt={dish.name} />
                    <CardImgOverlay className="ml-5">
                        <CardTitle id={dish.id}>
                            {dish.name}
                        </CardTitle>
                    </CardImgOverlay>
                    <Button onClick={toggle}>Details</Button>
                </CardHeader>

                <Collapse isOpen={isOpen}>
                    <CardBody id={dish.id}>
                        <ul>
                            <li>Cuisine: {dish.cuisine}</li>
                            <li>Duration: {dish.duration}</li>
                            <li>Igredients: {dish.ingredients}</li>
                            <li>Diet: {dish.diet}</li>
                            <li>Likes: {dish.likes}</li>
                            <li>Dislikes: {dish.dislikes}</li>
                            <li>Procedure:
                                <p className="d-none d-sm-block">{dish.description}</p>
                            </li>
                        </ul>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
    else {
        return (
            <Card key={dish.id}>
                <CardHeader>
                    <CardImgOverlay className="ml-5">
                        <CardTitle id={dish.id}>
                            {dish.name}
                        </CardTitle>
                    </CardImgOverlay>
                    <Button onClick={toggle}>Details</Button>
                </CardHeader>
                <Collapse isOpen={isOpen}>
                    <CardBody>
                        <ul>
                            <li>Cuisine: {dish.cuisine}</li>
                            <li>Duration: {dish.duration}</li>
                            <li>Igredients: {dish.ingredients}</li>
                            <li>Diet: {dish.diet}</li>
                            <li>Likes: {dish.likes}</li>
                            <li>Dislikes: {dish.dislikes}</li>
                            <li>Procedure:
                        <p className="d-none d-sm-block">{dish.description}</p>
                            </li>
                        </ul>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}

function state2props(state) {
    let st1 = Object.assign({}, state, { forms: state.forms, recipes: state.recipes });
    return st1;
}

export default connect(state2props)(Home);