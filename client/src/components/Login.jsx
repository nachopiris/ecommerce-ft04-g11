import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { login } from "../actions/auth";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, Redirect } from "react-router-dom";

function Login({ login }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        login(data)
            .then((res) => {
                console.log(res);
                setState({
                    ...state,
                    loading: false,
                });
                if (res.token) {
                    setState({
                        ...state,
                        logged: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                setState({
                    ...state,
                    loading: false,
                });
            });
    };
    console.log(watch("email"));

    const regValidated = {
        email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    };

    const [state, setState] = useState({
        passwordShowing: false,
        logged: false,
        loading: false,
    });

    const switchPassword = () => {
        setState({
            ...state,
            passwordShowing: !state.passwordShowing,
        });
    };

    return (
        <Container>
            {state.logged && <Redirect to="/cuenta" />}
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="border-0 bg-dark2">
                        <Card.Header className="border-0 h3">
                            Ingreso
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
                                        className={
                                            errors.email
                                                ? "is-invalid"
                                                : "mail-input"
                                        }
                                        ref={register({
                                            required: true,
                                            pattern: regValidated.email,
                                            maxLength: 191,
                                        })}
                                        type="text"
                                        name="email"
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.type === "required" &&
                                            "Debes ingresar tu correo electrónico"}
                                        {errors.email?.type === "pattern" &&
                                            "El correo electrónico ingresado no es válido"}
                                        {errors.email?.type === "maxLength" &&
                                            "El correo electrónico no puede exceder los 191 caracteres"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <IconContext.Provider
                                        value={
                                            state.passwordShowing
                                                ? { className: "icon-change" }
                                                : { className: "icon" }
                                        }
                                    >
                                        <Form.Label>
                                            <span>Clave</span>{" "}
                                            {state.passwordShowing ? (
                                                <BiHide
                                                    type="button"
                                                    onClick={() =>
                                                        switchPassword()
                                                    }
                                                    title="Ocultar clave"
                                                />
                                            ) : (
                                                <BiShowAlt
                                                    type="button"
                                                    onClick={() =>
                                                        switchPassword()
                                                    }
                                                    title="Mostrar clave"
                                                />
                                            )}
                                        </Form.Label>
                                    </IconContext.Provider>
                                    <Form.Control
                                        autoComplete="off"
                                        className={
                                            errors.password
                                                ? "is-invalid"
                                                : "password-input"
                                        }
                                        ref={register({ required: true })}
                                        name="password"
                                        type={
                                            state.passwordShowing
                                                ? "text"
                                                : "password"
                                        }
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password &&
                                            "Debes ingresar tu clave"}
                                    </Form.Control.Feedback>
                                    <Link className="link" to="#">
                                        <small>Olvidé mi clave</small>
                                    </Link>
                                </Form.Group>
                                <Form.Group className="d-flex justify-content-between">
                                    <Button
                                        disabled={state.loading}
                                        type="submit"
                                    >
                                        {state.loading
                                            ? "Cargando..."
                                            : "Iniciar sesión"}
                                    </Button>
                                    <span>
                                        ¿No estás registrado?{" "}
                                        <Link
                                            className="link"
                                            to="/registrarse"
                                        >
                                            Crea una cuenta
                                        </Link>
                                    </span>
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
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        login: (attributes) => dispatch(login(attributes)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
