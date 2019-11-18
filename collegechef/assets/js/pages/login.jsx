import React from 'react';
import {Modal, ModalHeader, ModalBody,
    Button, FormGroup, Form, Label, Input, Row } from 'reactstrap';



class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
          }
      
          this.toggleModal = this.toggleModal.bind(this);
          this.handleLogin = this.handleLogin.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

    handleLogin(event) {
        this.toggleModal();
        alert("User name: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
      }

    render() {
        return (
            <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password"
                                innerRef={(input) => this.password = input} />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Login</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default Login;