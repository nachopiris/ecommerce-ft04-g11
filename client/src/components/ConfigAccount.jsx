import {Modal, Form, Button} from 'react-bootstrap';
import React  from 'react';
import {useForm} from 'react-hook-form';

export default function ConfigAccount({show, auth, handleUpdate, handleClose}){
    // const [state, setState] = useState({
    //     user: null,
    //     passwordShowing: false
    // });
    const { register, handleSubmit, errors} = useForm();
    const onSubmit = data => {
        data.role = auth.user.role;
        handleUpdate(data);
        handleClose();
    }
//handleUpdate
    const regRules = {
        doc_number: /^[0-9]{7,8}$/,
        phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        address: /^[a-zA-Z0-9\s,'-]*$/,
        email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
        fullname: /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/,
      };

    //   const switchPassword = () => {
    //     setState({
    //         ...state,
    //         passwordShowing: !state.passwordShowing,
    //     });
    // };


    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton className="bg-dark2 border-0 text-white pb-0">
                    <Modal.Title className="mb-0">Borrar orden</Modal.Title>
                </Modal.Header>

                <Modal.Body className="bg-dark2">

                <Form.Group>
                                    <Form.Label>Nombre completo *</Form.Label>
                                    <Form.Control
                                        autoComplete="off"
                                        defaultValue={auth.user.fullname}
                                        className={
                                            errors.fullname
                                                ? "is-invalid"
                                                : "name-input"
                                        }
                                        ref={register({
                                            required: true,
                                            maxLength: 255,
                                            pattern: regRules.fullname,
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
                                        defaultValue={auth.user.email}
                                        className={
                                            errors.email
                                                ? "is-invalid"
                                                : "mail-input"
                                        }
                                        ref={register({
                                            required: true,
                                            pattern: regRules.email,
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
                      <Form.Label>
                        N° Documento <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        defaultValue={auth.user.doc_number}
                        className={errors.doc_number ? "is-invalid" : ""}
                        ref={register({
                          required: true,
                          pattern: regRules.doc_number,
                        })}
                        type="text"
                        name="doc_number"
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.doc_number?.type === "required" &&
                          "Tu número de documento es requerido"}
                        {errors.doc_number?.type === "pattern" &&
                          "Solo números, entre 7 y 8 digitos"}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>
                        Dirección <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        defaultValue={auth.user.address}
                        className={errors.address ? "is-invalid" : ""}
                        ref={register({
                          required: true,
                          minLength: 10,
                          maxLength: 255,
                          pattern: regRules.address,
                        })}
                        type="text"
                        name="address"
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.address?.type === "required" &&
                          "Tu dirección es requerida"}
                        {errors.address?.type === "minLength" &&
                          "Se requieren como mínimo 10 caracteres"}
                        {errors.address?.type === "maxLength" &&
                          "Se adminiten como máximo 255 caracteres"}
                        {errors.address?.type === "pattern" &&
                          "Solo letras y números"}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>
                        Teléfono / Celular{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        defaultValue={auth.user.phone}
                        className={errors.phone ? "is-invalid" : ""}
                        ref={register({
                          required: true,
                          pattern: regRules.phone,
                        })}
                        type="text"
                        name="phone"
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.type === "required" &&
                          "Se requiere un número de teléfono o celular"}
                        {errors.phone?.type === "pattern" &&
                          "Solo números, entre 10 y 16 dígitos"}
                      </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer className="bg-dark2 border-0">
                    <Button variant="secondary" onClick={handleClose} >Cancelar</Button>
                    <Button type="submit" variant="danger">Confirmar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}