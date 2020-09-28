import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

export default function EditUser({ show, handleClose, user, updateUser, giveAdminRights, giveUserRights }) {
    const { id, fullname, email, role, address, doc_number, phone } = user;
    const idLocal = JSON.parse(localStorage.redux).authReducer.user.id;

    const { register, handleSubmit} = useForm();
    const onSubmit = data => {
        data.id = state.id;
        updateUser()({id:state.id,data});
    }

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
    }, [user, id,
        fullname,
        email,
        role,
        address,
        doc_number,
        phone]);

    const handleInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header className="border-0 bg-dark2" closeButton>
                <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark2">
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Usuario N°</Form.Label>
                                <Form.Control ref={register} defaultValue={state.id} name="id" placeholder="Usuario N°" readOnly disabled />
                            </Form.Group>
                        </Col>
                        <Col lg={9}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control onChange={handleInput} ref={register} defaultValue={state.fullname} name="fullname" placeholder="Nombre" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control onChange={handleInput} ref={register} defaultValue={state.email} name="email" placeholder="Correo electrónico" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Form.Control as="select" defaultValue={state.role} custom name="role" disabled={idLocal === state.id} ref={register}>
                                    <option value="client">Usuario</option>
                                    <option value="admin">Administrador</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        {state.id === idLocal && (<Col>
                            <Form.Group>
                                <Form.Label>Atención</Form.Label><br />
                                {state.id === idLocal ? <span>No puedes modificar tus permisos</span> : user.role === "Usuario" ?
                                    <Button className="w-100" onClick={() => giveAdminRights()(id)}>Asignar rol Administrador</Button> :
                                    <Button className="w-100" onClick={() => giveUserRights()(id)}>Asignar rol Usuario</Button>}
                            </Form.Group>
                        </Col>)}
                    </Row>
                    <Form.Group>
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control onChange={handleInput} ref={register} defaultValue={state.address ? state.address : ""} name="address" placeholder="Dirección" />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Documento</Form.Label>
                                <Form.Control onChange={handleInput} ref={register} defaultValue={state.doc_number} name="doc_number" placeholder="Documento" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>N° de teléfono</Form.Label>
                                <Form.Control onChange={handleInput} ref={register} defaultValue={state.phone} name="phone" placeholder="N° de teléfono" />
                            </Form.Group>
                        </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between border-0 bg-dark2">
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
              </Button>
                <Button variant="warning" type="submit">
                    Modificar
                </Button>
            </Modal.Footer>
                </Form>
        </Modal>
    )
}