import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';


function About(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3>About Us</h3>
                    <br />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2019, Collegechef started as a Web Development project at Northeastern University. The idea was to help college students be able to make dishes with the ingredients available to them at home.</p>
                    <p>It also helps in students to see the recipes added by their fellow friends, at college away from home.</p>
                    <p>The application uses <em>Spoonacular</em>, an API that provides recipes</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">14 Nov. 2019</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">Northeastern University</dd>
                                <dt className="col-6">Professor and Advisor</dt>
                                <dd className="col-6">Nat Tuck</dd>
                                <dt className="col-6">Developers</dt>
                                <dd className="col-6">4</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                        I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                    <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                        P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );

}

export default About;