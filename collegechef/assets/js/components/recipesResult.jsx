import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Card, CardHeader, CardImgOverlay, CardImg, CardBody, CardTitle, Row, Collapse, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image from '../../static/images/no-image-icon.jpg';

class Results extends React.Component {

    constructor(props) {

        super(props);
        this.recipes = props.recipes;
        this.pageSize = 3;
        this.pagesCount = Math.ceil(this.recipes.length / this.pageSize);

        this.state = {
            currentPage: 0,
        };

    }

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });

    }

    render() {
        const { currentPage } = this.state;
        return (
            <React.Fragment>
                    <div className="pagination-wrapper">
                        <Pagination aria-label="Page navigation example">
                            <PaginationItem disabled={currentPage <= 0}>
                                <PaginationLink
                                    onClick={e => this.handleClick(e, currentPage - 1)}
                                    previous
                                    href="#"
                                />
                            </PaginationItem>
                            {[...Array(this.pagesCount)].map((page, i) =>
                                <PaginationItem active={i === currentPage} key={i}>
                                    <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )}
                            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                                <PaginationLink
                                    onClick={e => this.handleClick(e, currentPage + 1)}
                                    next
                                    href="#"
                                />
                            </PaginationItem>
                        </Pagination>
                    </div>
                <Row>
                    {this.recipes
                        .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                        )
                        .map((dish) => {
                            if (Object.keys(dish).length > 0) {
                                return(
                                    <div key={dish.id} className="col-4">
                                        <RenderMenuItem dish={dish} />
                                    </div>
                                );
                            }
                            else {
                                return (<div>No recipes found! Try again!</div>);
                            }
                        })}
                </Row>
            </React.Fragment>
        );
    }
}

const RenderMenuItem = ({ dish }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
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
                            <li>Contributed By: {dish.user}</li>
                            <li>Procedure:
                                <p className="d-none d-sm-block">{dish.description}</p>
                            </li>
                        </ul>
                        <FontAwesomeIcon icon="heart"/>{dish.like} {' '} <FontAwesomeIcon icon="heart-broken"/>{dish.dislikes}
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
    else {
        return (
            <Card key={dish.id}>
                <CardHeader>
                <CardImg width="100%" src={image} alt={dish.name} />
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
                            <li>Contributed By: {dish.user}</li>
                            
                            <li>Dislikes: {dish.dislikes}</li>
                            <li>Procedure:
                        <p className="d-none d-sm-block">{dish.description}</p>
                            </li>
                            
                        </ul>
                        <FontAwesomeIcon icon="heart"/>{dish.like} {' '} <FontAwesomeIcon icon="heart-broken"/>{dish.dislikes}
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}

export default Results;
