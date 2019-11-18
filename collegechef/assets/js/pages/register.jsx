
import React, { useState } from 'react';
import {
     Form, Label, Input, Col, Row
} from 'reactstrap';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }
    

    handleRegister(event) {
        event.preventDefault();
        console.log(event);
        if (this.password.value !== this.confpassword.value) {
            alert("Passwords do not match!");
        }

    }

    render() {
        const [modal, setModal] = useState(false);

        const toggle = () => setModal(!modal);

        return (
            <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
            // <div className="container">
            //     <div className="row row-content">
            //         <div className="col-12">
            //             <h3>Register</h3>
            //             <div className="col-12 col-md-9">
            //                 <Form onSubmit={(values) => handleRegister(values)}>
            //                     <Row className="form-group">
            //                         <Label md={2} htmlFor="name">Name:<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
            //                         <Col md={10}>
            //                             <Input type="text" id="name" name="name" required minLength="2" maxLength="12"
            //                                 innerRef={(input) => this.name = input} />
            //                         </Col>
            //                     </Row>
            //                     <Row className="form-group">
            //                         <Label md={2} htmlFor="email">Email:<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
            //                         <Col md={10}>
            //                             <Input type="email" id="email" name="email" required
            //                                 innerRef={(input) => this.email = input} />
            //                         </Col>
            //                     </Row>
            //                     <Row className="form-group">
            //                         <Label md={2} htmlFor="address">Address:</Label>
            //                         <Col md={10}>
            //                             <Input type="text" id="address" name="address"
            //                                 innerRef={(input) => this.address = input} />
            //                         </Col>
            //                     </Row>
            //                     <Row className="form-group">
            //                         <Label md={2} htmlFor="age">Age:</Label>
            //                         <Col md={10}>
            //                             <Input type="number" id="age" name="age" min="16" step="any"
            //                                 innerRef={(input) => this.age = input} />
            //                         </Col>
            //                     </Row>
            //                     <Row className="form-group">
            //                         <Label md={2} htmlFor="password">Password<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
            //                         <Col md={10}>
            //                             <Input type="password" id="password" name="password" required minLength="8" maxLength="20"
            //                                 innerRef={(input) => this.password = input} />
            //                         </Col>
            //                     </Row>
            //                     <Row className="form-group">
            //                         <Label md={2} htmlFor="confpassword">Confirm Password<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
            //                         <Col md={10}>
            //                             <Input type="password" id="congpassword" name="confpassword" required
            //                                 innerRef={(input) => this.confpassword = input} />
            //                         </Col>
            //                     </Row>
            //                     <Row className="form-group">
            //                         <Col md={{ size: 10, offset: 2 }}>
            //                             <Button type="submit" color="primary">Register</Button>
            //                         </Col>
            //                     </Row>
            //                 </Form >
            //             </div>
            //         </div>
            //     </div>
            // </div>


        )
    }
}

export default Register;