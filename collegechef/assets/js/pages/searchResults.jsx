import React from 'react';
import { Card, Row, CardImg, CardHeader, CardBody, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function RenderMenuItem({ dish }) {
    return (
        <Card>
            <CardHeader>
                <CardImgOverlay className="ml-5">
                    <CardTitle id={dish.id}>
                        {dish.name}
                    </CardTitle>
                </CardImgOverlay>
            </CardHeader>
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
        </Card >
    );
}

function SearchResults(props) {
    let recipes = Object.values(props.recipes);
    const dishes = recipes.map((rec) => {
        return (
            <div key={rec.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={rec} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Recipes
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Recipes</h3>
                </div>
            </div>
            <div>
                {dishes}
            </div>
        </div>
    );
}

function state2props(state) {
    return state;
}


export default connect(state2props)(SearchResults);