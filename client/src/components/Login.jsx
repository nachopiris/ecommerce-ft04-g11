import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { login } from '../actions/users';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { connect } from 'react-redux';

function Login({ login }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => login(data);
    console.log(watch("email"));

    const regValidated = {
        email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    }

    const [state, setState] = useState({
        passwordShowing: false
    });

    const switchPassword = () => {
        setState({
            ...state,
            passwordShowing: !state.passwordShowing
        })
    }

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="border-0 bg-dark2">
                        <Card.Header className="border-0">
                            Iniciar sesión
                                                </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control autoComplete="off" className={errors.email ? 'is-invalid' : ''} ref={register({ required: true, pattern: regValidated.email, maxLength: 191 })} type="text" name="email" ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.type === "required" &&
                                            "Se requiere un correo electrónico"}
                                        {errors.email?.type === "pattern" &&
                                            "El correo electrónico no es válido"}
                                        {errors.email?.type === "maxLength" &&
                                            "El correo electrónico no puede ser superior a 191 caracteres"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Clave <Button onClick={() => switchPassword()} variant="link">{state.passwordShowing ? 'Ocultar' : 'Mostrar'}</Button></Form.Label>
                                    <Form.Control autoComplete="off" className={errors.password ? 'is-invalid' : ''} ref={register({ required: true })} name="password" type={state.passwordShowing ? 'text' : 'password'}></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password && "Se requiere una clave de acceso"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit">
                                        Ingresar
                                                                        </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: attributes => dispatch(login(attributes))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);