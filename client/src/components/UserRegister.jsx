import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { register } from "../actions/auth";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, Redirect } from "react-router-dom";

function UserRegister({ userRegister, guestCart }) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        setState({
            ...state,
            loading: true,
        });
        userRegister({data, guestCart})
            .then((res) => {
                setState({
                    ...state,
                    loading: false,
                });
                if (!res.errors) {
                    setState({
                        ...state,
                        registered: true,
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

    const regValidated = {
        email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
        fullname: /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/,
    };

    const [state, setState] = useState({
        registered: false,
        passwordShowing: false,
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
            {state.registered && <Redirect to="/cuenta" />}
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="border-0 bg-dark2">
                        <Card.Header className="border-0 h3">
                            Registro
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group>
                                    <Form.Label>Nombre completo *</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
                                        className={
                                            errors.fullname
                                                ? "is-invalid"
                                                : "name-input"
                                        }
                                        ref={register({
                                            required: true,
                                            maxLength: 255,
                                            pattern: regValidated.fullname,
                                        })}
                                        name="fullname"
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.fullname?.type === "required" &&
                                            "Debes ingresar tu nombre y apellido"}
                                        {errors.fullname?.type ===
                                            "maxLength" &&
                                            "Tu nombre completo no puede exceder los 255 caracteres"}
                                        {errors.fullname?.type === "pattern" &&
                                            "El nombre ingresado no es válido"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Correo electrónico *
                                    </Form.Label>
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
                                            "Debes ingresar un correo electrónico"}
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
                                            <span
                                                style={{
                                                    marginRight: "0.125rem",
                                                }}
                                            >
                                                Clave *
                                            </span>{" "}
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
                                        ref={register({
                                            required: true,
                                            minLength: 8,
                                            maxLength: 16,
                                            pattern: regValidated.password,
                                        })}
                                        name="password"
                                        type={
                                            state.passwordShowing
                                                ? "text"
                                                : "password"
                                        }
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password?.type === "required" &&
                                            "Debes ingresar una clave"}
                                        {errors.password?.type === "pattern" &&
                                            "La clave debe contener al menos una mayúscula y un número"}
                                        {errors.password?.type ===
                                            "maxLength" &&
                                            "La clave no puede exceder los 16 caracteres"}
                                        {errors.password?.type ===
                                            "minLength" &&
                                            "La clave debe contener al menos 8 caracteres"}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="d-flex justify-content-between">
                                    <Button
                                        disabled={state.loading}
                                        type="submit"
                                    >
                                        {state.loading
                                            ? "Cargando..."
                                            : "Crear cuenta"}
                                    </Button>
                                    <span>
                                        ¿Ya estás registrado?{" "}
                                        <Link className="link" to="/ingresar">
                                            Inicia sesión
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
    return {
        auth: state.authReducer,
        guestCart: state.guestReducer.cart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userRegister: (attributes) => dispatch(register(attributes)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
