import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';


export default function DeleteUser({ show, handleClose, deleteReview, review }) {
    const { id } = review;
    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header className="border-0 bg-dark2" closeButton>
                <Modal.Title>Borrar reseña</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark2">
                <Alert className="m-0 mb-1 p-2" variant="danger">Atención: ¡está acción no podrá deshacerse!</Alert>
                ¿Estás seguro?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between border-0 bg-dark2">
                <Button variant="warning" onClick={handleClose}>
                    Cancelar
              </Button>
                <Button variant="danger" onClick={() => deleteReview()(id)}>
                    Sí, estoy seguro
              </Button>
            </Modal.Footer>
        </Modal>
    );
}