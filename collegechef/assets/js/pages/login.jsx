import React from 'react';
import {Modal, ModalHeader, ModalBody,
    Button, FormGroup, Form, Label, Input, Row } from 'reactstrap';
    import { Redirect } from 'react-router-dom'


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: true,
            redirect: null,
          }

          console.log(this);
          this.toggleModal = this.toggleModal.bind(this);
          this.handleLogin = this.handleLogin.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        }); 
        var path = "/";
        this.redirect(path);
      }

      redirect(path) {
        this.setState({
          redirect: path,
        });
      }
    

    handleLogin(event) {
        console.log(event);
        this.toggleModal();
        alert("User name: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
      }

    render() {
    if(this.state.redirect == null){
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
else {
    return <Redirect to={this.state.redirect} />
}
}
}

export default Login;