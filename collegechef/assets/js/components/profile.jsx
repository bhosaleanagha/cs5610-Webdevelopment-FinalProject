import React, {useState}  from 'react';
import { connect } from 'react-redux';
import { Container, Button, FormGroup, Form, Label, Input  } from 'reactstrap';
     import { Redirect } from 'react-router';
import { submit_password_change } from '../ajax';

 class Profile extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
            password: "",
             redirect: "",
             confirm_password: ""
           }
     }


     changed(data) {
         this.props.dispatch({
             type: 'CHANGE_PASSWORD',
             data: data,
         });
         this.setState({
            password: data,
        });
     }

     check(data) {
        this.setState({
           confirm_password: data,
        });

     }

     redirect(path) {
         this.setState({
             redirect: path,
         });
     }

     submit_password(env) {
         let pass=env.state.password;
         let pass1=env.state.confirm_password;
         if (pass.password == pass1.confirm_password) {
             submit_password_change(env);
         }
         else {
            alert("Passwords do not match!!");
         }
         
     }
     render() {
         let {password} = this.props;
         if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
         return (
             <div>
                     <Container>
                         <Form>
                             <FormGroup>
                                 <Label htmlFor="password">Password</Label>
                                 <Input type="password" id="password" name="password" onChange={
                                         (ev) => this.changed({password: ev.target.value})}/>
                             </FormGroup>
                             <FormGroup>
                                 <Label htmlFor="confirmed_password">Comfirmed Password</Label>
                                 <Input type="password" id="confirmed_password" name="confirmed_password" onChange={
                                         (ev) => this.check({confirm_password: ev.target.value})}/>
                             </FormGroup>
                            
                             <Button color="primary" onClick={()=> this.submit_password(this)}>Change</Button>
                         </Form>
                     </Container>
             </div>

        )

     }
 }


 function state2props(state) {
     return state.forms;
 }

 export default connect(state2props)(Profile);
