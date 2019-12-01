import React, { useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Card, CardHeader, CardImgOverlay, CardImg, CardBody, CardTitle, Row, Collapse, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import image from '../../static/images/no-image-icon.jpg';
import ReactCardFlip from 'react-card-flip';


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
    const [isFlipped, setIsOpen] = useState(false);

  
    const handleClick = (ev) => {
        ev.preventDefault();
        setIsOpen(!isFlipped);
    }

    if (dish.data != null) {
        return (
            <Card key={dish.id}>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    <div key="front">
                        <CardHeader>
                            <CardImg top width="256px" height="186px" src={dish.data} alt={dish.name} />
                                <CardTitle id={dish.id}>
                                    {dish.name}
                                </CardTitle>
                            <Button onClick={handleClick}>Details</Button>
                        </CardHeader>
                    </div>
                    <div key="back">
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
                            <div className="ratings">
                                <FontAwesomeIcon icon="heart">{dish.like}</FontAwesomeIcon>
                                <FontAwesomeIcon icon="heart-broken">{dish.dislikes}</FontAwesomeIcon>
                            </div>
                            
                            <Button className="btn btn-info" onClick={handleClick}>Photo</Button>
                        </CardBody>
                    </div>
                </ReactCardFlip>
            </Card>
        );
    } else {
        return (
            <Card key={dish.id}>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                    <div key="front">
                        <CardHeader>
                            <CardImg top width="150" height="250" src={image} alt={dish.name} />
                                <CardTitle id={dish.id}>
                                    {dish.name}
                                </CardTitle>
                            <Button className="btn btn-info" onClick={handleClick}>Details</Button>
                        </CardHeader>
                    </div>
                    <div key="back">
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
                            <div className="ratings">
                                <FontAwesomeIcon icon="heart"/> {dish.like}
                                <FontAwesomeIcon icon="heart-broken"/>{dish.dislikes}
                            </div>
                            <Button className="btn btn-info" onClick={handleClick}>Photo</Button>
                        </CardBody>
                    </div>
                </ReactCardFlip>
            </Card>
        );
    }
}

export default Results;
