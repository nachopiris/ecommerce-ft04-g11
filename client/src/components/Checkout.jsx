import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { createOrder } from "../actions/checkout";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getCollect } from "../actions/products";
import { payOrder } from "../actions/payment";
import { getUserCart } from "../actions/users";

function Checkout({
  token,
  user,
  userCart,
  createOrder,
  payOrder,
  getUserCart,
}) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setState({
      ...state,
      loading: true,
    });

    createOrder({ ...data, token })
      .then((res) => {
        setState({
          ...state,
          loading: false,
        });
        payOrder(token, state.products)
        .then((response) => {
          window.open(response.data, "_self");
        });
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          loading: false,
        });
      });
  };

  const [state, setState] = useState({
    total: 0,
    products: [],
    loading: false,
    user: {},
  });

  const regRules = {
    doc_number: /^[0-9]{7,8}$/,
    phone: /^[0-9]{10,16}$/,
    address: /^[a-zA-Z0-9\s,'-]*$/,
  };

  useEffect(() => {
    getUserCart(token);
  },[getUserCart,token])

  useEffect(() => {
    if (!userCart.products) return;
    let products = [];
    let total = 0;
    userCart.products.forEach((item) => {
      let product = {
        id: item.id,
        name: item.name,
        price: item.orderline.price,
        quantity: item.orderline.quantity,
        stock: item.stock,
        subtotal: item.orderline.price * item.orderline.quantity,
        image: JSON.parse(item.images)[0],
      };
      products.push(product);
      total += product.subtotal;
    });

    setState( state => {
        return {
          ...state,
          products,
          total:total,
          user: userCart.user
        }
    });
  }, [userCart]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          {state.user && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Card className="bg-dark2">
                <Card.Header>Confirmar pedido</Card.Header>
                <Card.Body>
                  <div className="text-center mt-3">
                    <span className="text-muted">Total a pagar:</span>
                    <h2 className="mb-4">
                      <NumberFormat
                        prefix=" $"
                        value={state.total}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        displayType={"text"}
                      />
                    </h2>
                  </div>
                  <div className="w-75 m-auto pb-4">
                    {state.products.map((item, index) => (
                      <div
                        key={index}
                        className="p-3 shadow d-flex justify-content-between"
                      >
                        <span>
                          <span className="text-muted">{item.name}</span>{" "}
                          <span className="badge badge-dark">
                            {item.quantity} x ${item.price}
                          </span>
                        </span>
                        <span>${item.subtotal}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-75 m-auto shadow rounded p-3 my-2">
                    {(!state.user.address ||
                      !state.user.doc_number ||
                      !state.user.phone) && (
                      <p className="text-muted py-4">
                        <b>{user.fullname.split(" ")[0]}</b>, necesitamos
                        algunos datos para completar la compra.{" "}
                        <b>Solo tomará un minuto!</b>
                      </p>
                    )}
                    <Form.Group>
                      <Form.Label>
                        N° Documento <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        defaultValue={state.user.doc_number}
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
                        defaultValue={state.user.address}
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
                        defaultValue={state.user.phone}
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
                  </div>
                </Card.Body>
                <Card.Footer className="text-center p-4">
                  <div className="w-75 m-auto pb-3">
                    <Button
                      type="submit"
                      className="text-uppercase m-auto"
                      disabled={state.loading}
                      block
                      size="lg"
                    >
                      {state.loading ? "Cargando..." : "Confirmar y pagar"}
                    </Button>
                    <small></small>
                  </div>
                  <Link to="/carrito">Volver al carrito</Link>
                </Card.Footer>
              </Card>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    guestCart: state.guestReducer.cart,
    userCart: state.usersReducer.userCart,
    totalCost: state.usersReducer.totalCost,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createOrder: (data) => dispatch(createOrder(data)), //{token, email, address, phone}
    getCollect: (ids) => dispatch(getCollect(ids)),
    payOrder: (token, products) => dispatch(payOrder(token, products)),
    getUserCart: (token) => dispatch(getUserCart(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
