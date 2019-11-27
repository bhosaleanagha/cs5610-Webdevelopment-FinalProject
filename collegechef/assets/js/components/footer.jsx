import React from 'react';
import {Link} from 'react-router-dom';

function Footer(props){
    return(
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <p>Attribution: Placeholder images are from <a href="https://www.pexels.com/public-domain-images/">Pexel.com</a>, which is a public domain free images site.</p>
                    </div>
                    <div className="col-6">
                        <p>Attribution: Code snippets are borrowed from <a href="https://github.com/NatTuck/lens/tree/spa4-user-sessions">Nat Tuck's Git Hub</a></p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <p>Disclaimer: Users are responsible for any content uploaded on this site.</p>
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