import React from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';


export default function DeleteUser({ show, handleClose, user, deleteUser }) {
    let _user = user;
    if(_user.role === 'client') _user.role = 'Usuario';
    if(_user.role === 'admin') _user.role = 'Administrador';

    const { id, fullname, email, role } = _user;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="border-0 bg-dark2" closeButton>
                <Modal.Title>¿Desea eliminar al usuario N°{id}?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark2">
                <Alert className="m-0 mb-1 p-2" variant="danger">Atención: ¡está acción no podrá deshacerse!</Alert>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control defaultValue={fullname} name="fullname" placeholder="Nombre" readOnly disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control defaultValue={email} name="email" placeholder="Correo electrónico" readOnly disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Rol</Form.Label>
                    <Form.Control defaultValue={role} name="role" placeholder="Rol" readOnly disabled />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between border-0 bg-dark2">
                <Button variant="warning" onClick={handleClose}>
                    Cancelar
              </Button>
                <Button variant="danger" onClick={() => deleteUser()(id)}>
                    Sí, estoy seguro
              </Button>
            </Modal.Footer>
        </Modal>
    );
}