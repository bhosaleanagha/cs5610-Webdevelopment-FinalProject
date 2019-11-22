import React from 'react';
import {Modal, ModalHeader, ModalBody, Button, Label, Input } from 'reactstrap';
import { Alert, FormGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {submit_login} from '../ajax';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: true,
            redirect: null,
          }

          this.toggleModal = this.toggleModal.bind(this);
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

      changed(data) {
        this.props.dispatch({
          type: 'CHANGE_LOGIN',
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
      
          let {email, password, errors} = this.props;
          let error_msg = null;
          if (errors) {
            error_msg = <Alert variant="danger">Information Is Incorrect</Alert>;
          }
      
        return (
            <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                { error_msg }
                <ModalBody>
                  <Form>
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
                      <Button color="primary" onClick={()=> submit_login(this)}>Login</Button>
                  </Form>
            </ModalBody>
            </Modal>
            )
    }
}

function state2props(state) {
    return state.forms.login;
  }
  
export default connect(state2props)(Login);