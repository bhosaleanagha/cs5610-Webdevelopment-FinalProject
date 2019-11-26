import React from 'react';
import { Alert, FormGroup, Form } from 'react-bootstrap';
import { connect } from 'react-redux';

const NotFound = ({ location }) => (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
     <h1>404 Page not Found</h1>
    </div>
  )

  function state2props(state) {
    return state
  }
  export default connect(state2props)(NotFound);