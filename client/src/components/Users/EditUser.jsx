import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default function EditUser({ show, handleClose, user, updateUser, giveAdminRights, giveUserRights }) {
    const { id, fullname, email, role, address, doc_number, phone } = user;
    const idLocal = JSON.parse(localStorage.redux).authReducer.user.id;

    const [state, setState] = useState({
        id,
        fullname,
        email,
        role,
        address,
        doc_number,
        phone
    });

    useEffect(() => {
        setState({
            id,
            fullname,
            email,
            role,
            address,
            doc_number,
            phone
        });
    }, [user]);

    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="border-0 bg-dark2" closeButton>
                <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark2">
                <Form>
                    <Row>
                        <Col >
                            <Form.Group>
                                <Form.Label>Usuario N°</Form.Label>
                                <Form.Control value={state.id} name="id" placeholder="Usuario N°" readOnly disabled />
                            </Form.Group>
                        </Col>
                        <Col lg={9}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={handleInput} value={state.fullname} name="fullname" placeholder="Nombre" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control onChange={handleInput} value={state.email} name="email" placeholder="Correo electrónico" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Form.Control value={state.role === "client" && ("Usuario") ||
                                    state.role === "admin" && ("Administrador")} name="role" placeholder="Rol" readOnly disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Acciones</Form.Label><br />
                                {state.id === idLocal ? <span>No puedes modificar tus permisos</span> : user.role === "client" ?
                                    <Button className="w-100" onClick={() => giveAdminRights()(id)}>Asignar rol Administrador</Button> :
                                    <Button className="w-100" onClick={() => giveUserRights()(id)}>Asignar rol Usuario</Button>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control onChange={handleInput} value={state.address ? state.address : ""} name="address" placeholder="Dirección" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Documento</Form.Label>
                                <Form.Control onChange={handleInput} value={state.doc_number * 1 == 0 ? "" : state.doc_number * 1} name="doc_number" placeholder="Documento" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>N° de teléfono</Form.Label>
                                <Form.Control onChange={handleInput} value={state.phone * 1 == 0 ? "" : state.phone * 1} name="phone" placeholder="N° de teléfono" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between border-0 bg-dark2">
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
              </Button>
                <Button variant="warning" onClick={() => updateUser()(id, state)}>
                    Modificar
              </Button>
            </Modal.Footer>
        </Modal>
    )
}