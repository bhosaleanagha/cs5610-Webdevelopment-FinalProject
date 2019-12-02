import React from 'react';
import {Modal, ModalHeader, ModalBody, Button, FormGroup, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {submit_register} from '../ajax';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        isModalOpen: true,
        redirect: null,
        password: "",
        confirmed_password: "",
      }

      this.toggleModal = this.toggleModal.bind(this);

}

    changed(data) {
      this.setState({password: data});
      this.props.dispatch({
        type: 'REGISTER_USER',
        data: data,
      });
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        }); 
        var path = this.props.location.state.background.pathname;
        this.redirect(path);
      }

      redirect(path) {
        this.setState({
          redirect: path,
        });
      }

      check(data) {
        this.setState({
           confirmed_password: data,
        });

     }

      submit(env){
        let pass=env.state.password;
         let pass1=env.state.confirmed_password;
         if (pass.password == pass1.confirmed_password) {
             submit_register(env);
         }
         else {
            alert("Passwords do not match!!");
         }
      }
    render() {
      let {first_name, last_name, email, password, errors} = this.props;
      let error_msg = null;
      if (errors) {
        error_msg = <Alert variant="danger">{ errors }</Alert>;
      }


      if(this.state.redirect == null){
        return (
            <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
                { error_msg }
                <ModalBody>
                  <Form>
                      <FormGroup>
                          <Label htmlFor="first_name">First Name</Label>
                          <Input type="text" id="first_name" name="first_name" onChange={
                                (ev) => this.changed({first_name: ev.target.value})}/>
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input type="text" id="last_name" name="last_name" onChange={
                                (ev) => this.changed({last_name: ev.target.value})}/>
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="email">Email</Label>
                          <Input type="text" id="email" name="email" onChange={
                                (ev) => this.changed({email: ev.target.value})}/>
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Input type="password" id="password" name="password" onChange={
                                (ev) => this.changed({password: ev.target.value})}/>
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="confirmed_password">Confirm Password</Label>
                          <Input type="password" id="confirmed_password" name="confirmed_password"
                          onChange={
                            (ev) => this.check({confirmed_password: ev.target.value})}/>
                      </FormGroup>
                      
                      <Button color="primary" onClick={()=> this.submit(this)}>Register</Button>
                  </Form>
            </ModalBody>
            </Modal>
        )
    } else {
      return <Redirect to={this.state.redirect} />
    }
  }
 
}  

function state2props(state) {
  return state.forms.register;
}

export default connect(state2props)(Register);