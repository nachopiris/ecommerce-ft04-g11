import React from 'react';
import { Modal, Button } from 'react-bootstrap';


function ConfirmDelete({ show, handleClose, product: { id, name, image }, deleteProduct }) {
        return (
                <Modal show={show} className="text-dark" onHide={handleClose}>
                        <Modal.Header closeButton>
                                <Modal.Title>¿Está seguro que desea borrar el producto?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                                <h3 className="text-dark">{name}</h3>
                                <img width="128" className="rounded img-thumbnail" alt={'Imagen del producto '+name} src={image} />
                                <br />
                                <span className="text-danger">
                                        ¡No hay vuelta atras!
                                </span>

                        </Modal.Body>
                        <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                        Cancelar
              </Button>
                                <Button variant="danger" onClick={() => { deleteProduct()(id) }}>
                                        Si, estoy seguro
              </Button>
                        </Modal.Footer>
                </Modal>
        );
}

export default ConfirmDelete;