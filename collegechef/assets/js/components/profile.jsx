import React, {useState}  from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Modal, ModalHeader,
     ModalBody, Button, FormGroup, Form, Label, Input  } from 'reactstrap';

import { submit_password_change } from '../ajax';


let Profile = connect(({ session }) => ({ session }))(({ session, dispatch }) => {

    function changed(data) {
        dispatch({
            type: 'CHANGE_PASSWORD',
            data: data,
        });
    }

    return (
        <div>
            <Container>
                <h1 className="profile_title">Chef {session.user_fname + ' ' + session.user_lname}</h1>
                <h3>Email: {session.user_email}</h3>

                    <Form>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" onChange={
                                (ev) => changed({password: ev.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmed_password">Comfirmed Password</Label>
                        <Input type="password" id="confirmed_password" name="confirmed_password"/>
                    </FormGroup>
                    
                    <Button color="primary" onClick={()=> submit_password_change(this)}>Change Password</Button>
                </Form>
            </Container>
        </div>
    );
})     

// class Profile extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             isModalOpen: false,
//             redirect: null,
//           }

//         this.toggleModal = this.toggleModal.bind(this);
//     }


//     changed(data) {
//         this.props.dispatch({
//             type: 'CHANGE_PASSWORD',
//             data: data,
//         });
//     }

//     toggleModal() {
//         this.setState({
//           isModalOpen: !this.state.isModalOpen
//         }); 
//         var path = this.props.location.state.background.pathname;
//         this.redirect(path);
//       }


//     redirect(path) {
//         this.setState({
//             redirect: path,
//         });
//     }


//     render() {
//         let {password} = this.props;

//         return (
            // <div>
            //     <Jumbotron fluid>
            //         <Container>
            //             <p>johndoe@gmail.com</p>
            //             <Modal isOpen={this.state.isModalOpen} fade={false} toggle={this.toggleModal}>
            //             <ModalHeader toggle={this.toggleModal}>Change Password</ModalHeader>
            //             <ModalBody>
            //             <Form>
            //                 <FormGroup>
            //                     <Label htmlFor="password">Password</Label>
            //                     <Input type="password" id="password" name="password" onChange={
            //                             (ev) => this.changed({password: ev.target.value})}/>
            //                 </FormGroup>
            //                 <FormGroup>
            //                     <Label htmlFor="confirmed_password">Comfirmed Password</Label>
            //                     <Input type="password" id="confirmed_password" name="confirmed_password"/>
            //                 </FormGroup>
                            
            //                 <Button color="primary" onClick={()=> submit_password_change(this)}>Change</Button>
            //             </Form>
            //         </ModalBody>
            //         </Modal>
            //         </Container>
            //     </Jumbotron>
            //     <h1>Bookmarked</h1>
            // </div>

//         )

//     }
// }

// function state2props(state) {
//     return state.forms;
// }

// export default connect(state2props)(Profile);
export default Profile;