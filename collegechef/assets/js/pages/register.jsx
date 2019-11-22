
import {
     Form, Label, Input, Col, Row
} from 'reactstrap';

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Register = (props) => {
    const {
        buttonLabel,
        className
      } = props;
    
      const [modal, setModal] = useState(false);
    
      const toggle = () => setModal(!modal);

      return (
        <div>
          {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
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
      );    
}


// class Register extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleRegister = this.handleRegister.bind(this);
//     }
    

//     handleRegister(event) {
//         event.preventDefault();
//         if (this.password.value !== this.confpassword.value) {
//             alert("Passwords do not match!");
//         }
//     }

//     render() {
//         if(this.state.redirect == null){
//             return (
//                 <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggleModal}>
//                     <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
//                     <ModalBody>
//                         <Form onSubmit={this.handleLogin}>
//                             <FormGroup>
//                                 <Label htmlFor="username">Username</Label>
//                                 <Input type="text" id="username" name="username"
//                                     innerRef={(input) => this.username = input} />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input type="password" id="password" name="password"
//                                     innerRef={(input) => this.password = input} />
//                             </FormGroup>
//                             <Button type="submit" value="submit" color="primary">Login</Button>
//                         </Form>
//                     </ModalBody>
//                 </Modal>
//             )
//         }
//     else {
//         return <Redirect to={this.state.redirect} />
//     }
//     }
// }

export default Register;