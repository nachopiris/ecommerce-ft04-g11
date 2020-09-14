import { Card, Form, Button, Row, Col, Container } from 'react-bootstrap';
import { register } from '../actions/users';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { connect } from 'react-redux';

function UserRegister({ userRegister }) {
        const { register, handleSubmit, watch, errors } = useForm();
        const onSubmit = data => userRegister(data);
        console.log(watch("email"));

        const regValidated = {
                email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
                fullname: /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/
        }

        const [state, setState] = useState({
                fullname: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                passwordShowing: false
        });

        const switchPassword = () => {
                setState({
                        ...state,
                        passwordShowing: !state.passwordShowing
                })
        }

        const handleOnChange = (e) => {
                let val = e.target.value;
                setState({
                        ...state,
                        [e.target.name]: val
                });
        }

        // const handleSubmit = (e) => {
        //         e.preventDefault();
        //         userRegister(state);
        // }
        return (
                <Container>
                        <Row className="justify-content-center">
                                <Col md={8}>
                                        <Card className="border-0 bg-dark2">
                                                <Card.Header className="border-0">
                                                        Crearse una cuenta
                                                </Card.Header>
                                                <Card.Body>
                                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                                                <Form.Group>
                                                                        <Form.Label>Nombre completo</Form.Label>
                                                                        <Form.Control autoComplete="off" className={errors.fullname ? 'is-invalid' : ''} ref={register({ required: true, maxLength: 255, pattern: regValidated.fullname })} name="fullname"></Form.Control>
                                                                        <Form.Control.Feedback type="invalid">
                                                                                {errors.fullname?.type === "required" &&
                                                                                        "Necesitamos tu nombre completo"}
                                                                                {errors.fullname?.type === "maxLength" &&
                                                                                        "Tu nombre completo no puede ser superior a 255 caracteres"}
                                                                                {errors.fullname?.type === "pattern" &&
                                                                                        "El nombre completo no es válido"}
                                                                        </Form.Control.Feedback>
                                                                </Form.Group>
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
                                                                        <Form.Control autoComplete="off" className={errors.password ? 'is-invalid' : ''} ref={register({ required: true, minLength: 8, maxLength: 16, pattern: regValidated.password })} name="password" type={state.passwordShowing ? 'text' : 'password'}></Form.Control>
                                                                        <Form.Control.Feedback type="invalid">
                                                                                {errors.password?.type === "required" &&
                                                                                        "Se requiere una clave de acceso"}
                                                                                {errors.password?.type === "pattern" &&
                                                                                        "La clave debe contener números, letras minúsculas y mayúsculas"}
                                                                                {errors.password?.type === "maxLength" &&
                                                                                        "La clave de acceso no debe ser superior a 16 caracteres"}
                                                                                {errors.password?.type === "minLength" &&
                                                                                        "La clave de acceso no debe ser inferior a 8 caracteres"}
                                                                        </Form.Control.Feedback>
                                                                </Form.Group>
                                                                <Form.Group>
                                                                        <Button type="submit">
                                                                                Crear cuenta
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
                userRegister: attributes => dispatch(register(attributes))
        }
}

export default connect(
        mapStateToProps,
        mapDispatchToProps
)(UserRegister);