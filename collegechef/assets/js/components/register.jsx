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
      }

      this.toggleModal = this.toggleModal.bind(this);

}

    changed(data) {
      this.props.dispatch({
        type: 'REGISTER_USER',
        data: data,
      });
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
                          <Label htmlFor="confirmed_password">Comfirmed Password</Label>
                          <Input type="password" id="confirmed_password" name="confirmed_password"/>
                      </FormGroup>
                      
                      <Button color="primary" onClick={()=> submit_register(this)}>Register</Button>
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