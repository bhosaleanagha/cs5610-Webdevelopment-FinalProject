import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';


function About(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h3 className="welcoming">About CollegeChef</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <h2 className="aboutus_subtitle">CollegeChef History</h2>
                    <p className="aboutus_statement">Started in 2019, Collegechef started as a Web Development project at Northeastern University. The idea was to help college students be able to make dishes with the ingredients available to them at home.</p>
                </div>
                <div className="col-12 col-md-5">
                     <h2 className="aboutus_subtitle">CollegeChef's Team</h2>
                     <ul className="aboutus_ul">
                         <li>Prateeksha Lingashettar</li>
                         <li>Ruchit Urunkar</li>
                         <li>Anagha Bhosale</li>
                         <li>Jonathan Chery</li>
                     </ul>
                </div>
                <div className="col-6 col-md-12">
                    <Card>
                        <CardHeader className="bg-info text-white">CollegeChef's Attribution</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dd className="col-12">Placeholder images are from <a href="https://www.pexels.com/public-domain-images/">Pexel.com</a>, a public domain free images site</dd>
                                <dd className="col-12">Code snippets are borrowed from <a href="https://github.com/NatTuck/lens/tree/spa4-user-sessions">Nat Tuck's Git Hub</a></dd>
                                <dd className="col-12">Food API from Spoonacular <a href="https://spoonacular.com/food-api">Spoonacular</a></dd>
                                <dd className="col-12">Fonts from <a href="https://fonts.google.com/"> Google Fonts</a></dd>
                                <dd className="col-12">Icons from <a href="https://fontawesome.com/"> Font Awesome</a></dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );

}

export default About;