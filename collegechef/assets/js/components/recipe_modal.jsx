import React, {useState} from 'react';
import { Button, Container, Modal, ModalHeader, ModalTitle,ModalBody,ModalFooter} from 'react-bootstrap';

import _ from 'lodash';

function RecipeModal(recipeInfo) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div>
        <Button variant="outline-info" onClick={handleShow}>
          Details
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{recipeInfo.recipeInfo.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {recipeInfo.recipeInfo.ingredients[0].originalString ? recipeInfo.recipeInfo.ingredients[0].originalString : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  export default RecipeModal;