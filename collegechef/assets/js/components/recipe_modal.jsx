import React, {useState} from 'react';
import {Card, CardImg, CardTitle, CardText, CardDeck,CardSubtitle, CardBody, Col} from 'reactstrap';
import { Button, Container, Modal, ModalHeader, ModalTitle,ModalBody,ModalFooter} from 'react-bootstrap';

import _ from 'lodash';

function RecipeModal(recipeInfo) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div>
        <Button variant="outline-info" onClick={handleShow}>
          Button
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{recipeInfo.recipeInfo.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{recipeInfo.recipeInfo.ingredients[0].originalString}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  export default RecipeModal;