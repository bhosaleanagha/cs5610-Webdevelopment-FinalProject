import React from 'react';
import { Pagination, PaginationItem, PaginationLink, Card, CardHeader, CardImgOverlay, CardImg, CardBody, CardTitle, Row } from 'reactstrap';

class Results extends React.Component {

    constructor(props) {

        super(props);
        this.recipes = props.recipes;
        this.pageSize = 2;
        this.pagesCount = Math.ceil(this.recipes.length / this.pageSize);

        this.state = {
            currentPage: 0
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
                <Row>
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
                </Row>
                <Row>
                    {this.recipes
                        .slice(
                            currentPage * this.pageSize,
                            (currentPage + 1) * this.pageSize
                        )
                        .map((dish) => {
                            if (Object.keys(dish).length > 0) {
                                if (dish.data != null) {
                                    return (
                                        <Card key={dish.id} className="col-4">
                                            <CardHeader>
                                                <CardImg width="100%" src={dish.data} alt={dish.name} />
                                                <CardImgOverlay className="ml-5">
                                                    <CardTitle id={dish.id}>
                                                        {dish.name}
                                                    </CardTitle>
                                                </CardImgOverlay>
                                            </CardHeader>
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
                                        </Card>
                                    );
                                }
                                else {
                                    return (
                                        <Card key={dish.id} className="col-4">
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
                                        </Card>
                                    )
                                }
                            }
                            else {
                                return;
                            }
                        })}
                </Row>
            </React.Fragment>
        );
    }
}

export default Results;
