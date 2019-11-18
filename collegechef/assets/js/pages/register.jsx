import React from 'react';
import {
    Button, Form, Label, Input, Col, Row
} from 'reactstrap';


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
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Register</h3>
                        <div className="col-12 col-md-9">
                            <Form onSubmit={(values) => handleRegister(values)}>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="name">Name:<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
                                    <Col md={10}>
                                        <Input type="text" id="name" name="name" required minLength="2" maxLength="12"
                                            innerRef={(input) => this.name = input} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="email">Email:<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
                                    <Col md={10}>
                                        <Input type="email" id="email" name="email" required
                                            innerRef={(input) => this.email = input} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="address">Address:</Label>
                                    <Col md={10}>
                                        <Input type="text" id="address" name="address"
                                            innerRef={(input) => this.address = input} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="age">Age:</Label>
                                    <Col md={10}>
                                        <Input type="number" id="age" name="age" min="16" step="any"
                                            innerRef={(input) => this.age = input} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="password">Password<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
                                    <Col md={10}>
                                        <Input type="password" id="password" name="password" required minLength="8" maxLength="20"
                                            innerRef={(input) => this.password = input} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={2} htmlFor="confpassword">Confirm Password<abbr title="This field is mandatory" aria-label="required">*</abbr></Label>
                                    <Col md={10}>
                                        <Input type="password" id="congpassword" name="confpassword" required
                                            innerRef={(input) => this.confpassword = input} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="primary">Register</Button>
                                    </Col>
                                </Row>
                            </Form >
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;