import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { passwordReset, passwordChange } from "../actions/auth";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, Redirect } from "react-router-dom";

function PasswordReset({ passwordReset, passwordChange }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
        setState({
            ...state,
            loading: true
        });
        switch (state.step) {
            case 1:
                passwordReset(data.email)
                    .then((res) => {
                        console.log(res);
                        setState({
                            ...state,
                            loading: false,
                            email: data.email,
                            step: 2
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        setState({
                            ...state,
                            loading: false,
                        });
                    });
                break;
            case 2:
                passwordChange({ email: state.email || data.email, code: data.code, password: data.password })
                    .then((res) => {
                        console.log(res);
                        setState({
                            ...state,
                            loading: false,
                            reseted: true,
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                        setState({
                            ...state,
                            loading: false,
                        });
                    });
                break;

            default:
                break;
        }
    };

    const regValidated = {
        email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
        code: /^[0-9]{6}$/
    };

    const [state, setState] = useState({
        passwordShowing: false,
        reseted: false,
        loading: false,
        email: null,
        step: 1
    });

    const switchPassword = () => {
        setState({
            ...state,
            passwordShowing: !state.passwordShowing,
        });
    };

    return (
        <Container>
            {state.reseted && <Redirect to="/ingresar" />}
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="border-0 bg-dark2">
                        <Card.Header className="border-0 h3">
                            Recuperar clave de acceso
                        </Card.Header>
                        <Card.Body>
                            {state.step === 1 && (<p>
                                Ingresa tu correo electrónico. Recibirás un código de seguridad para recuperar tu cuenta.
                                {" "} <a href="#" onClick={() => setState({ ...state, step: 2 })}>ya tengo el código </a>
                            </p>)}

                            {state.step === 2 && (
                                <p>
                                    Código enviado. Recuerda revisar también la casilla de correo no deseado.
                                    <a href="#" onClick={() => setState({ ...state, step: 1 })}>No me llegó el código</a>
                                </p>
                            )}
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                {(state.step === 1 || state.email === null) && (<Form.Group>
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control
                                        autoFocus
                                        defaultValue={state.email}
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
                                </Form.Group>)}

                                {state.step === 2 && (
                                    <React.Fragment>
                                        <Form.Group>
                                            <Form.Label>Código recibido</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                autoComplete="off"
                                                className={
                                                    errors.code
                                                        ? "is-invalid"
                                                        : ""
                                                }
                                                ref={register({
                                                    required: true,
                                                    pattern: regValidated.code,
                                                })}
                                                type="text"
                                                name="code"
                                            ></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.code?.type === "required" &&
                                                    "Debes ingresar el código de seguridad"}
                                                {errors.code?.type === "pattern" &&
                                                    "El código ingresado no es válido"}
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
                                                    <span>Nueva clave</span>{" "}
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
                                                    "Por favor ingrese su nueva clave"}
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
                                    </React.Fragment>
                                )}
                                <Form.Group>

                                    <Link className="link" to="/ingresar">
                                        <small>Recordé mi clave</small>
                                    </Link>
                                </Form.Group>
                                <Form.Group>
                                    <Button
                                        disabled={state.loading}
                                        type="submit"
                                        className="mb-2"
                                        block
                                    >
                                        {state.loading
                                            ? "Cargando..."
                                            : state.step === 1 ? 'Enviar código' : 'Cambíar clave'}
                                    </Button>
                                    <p className="mb-0">
                                        ¿No estás registrado?{" "}
                                        <Link
                                            className="link"
                                            to="/registrarse"
                                        >
                                            Crea una cuenta
                                        </Link>
                                    </p>
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

    };
}

function mapDispatchToProps(dispatch) {
    return {
        passwordReset: (email) => dispatch(passwordReset(email)),
        passwordChange: (data) => dispatch(passwordChange(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
