import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props){
    return(
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-1 col-sm-2">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/aboutus">About Us</Link></li>
                            <li><Link to="/menu">Menu</Link></li>
                            <li><Link to="/contactus">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address className="address">
                            Northeastern University<br/>
                            360 Huntington Ave<br/>
                            Boston, MA, 02115<br/>
                            <i className="fa fa-phone"></i>
                            Tel.: +1 (617) 373-2000<br/>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><span
                                className="fa fa-google-plus fa-lg"></span></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><span
                                className="fa fa-facebook fa-lg"></span></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i
                                className="fa fa-linkedin fa-lg"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i
                                className="fa fa-twitter fa-lg"></i></a>
                            <a className="btn btn-social-icon btn-youtube" href="http://youtube.com/"><i
                                className="fa fa-youtube fa-lg"></i></a>
                            <a className="btn btn-social-icon" href="mailto:"><i className="fa fa-envelope fa-lg"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>© Copyright 2019 Collegechef</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;