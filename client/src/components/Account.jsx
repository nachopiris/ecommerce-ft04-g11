import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { getOrders } from "../actions/users";
import { cancelOrder } from "../actions/checkout";
import { payOrder } from "../actions/payment";
import moment from "moment";

function Account({ auth, logout, orders, getOrders, cancelOrder, payOrder }) {
  const { user, token } = auth;
  const logOut = () => {
    logout(token).then(() => {
      localStorage.clear();
      window.location.reload();
    });
  };

  const handleCancel = (id) => {
    return () => {
      cancelOrder({ token: auth.token, orderId: id }).then(() => {
        getOrders(auth.token);
      });
    };
  };

  const [state, setState] = useState({
    orders: [],
    filter: "",
  });

  useEffect(() => {
    getOrders(auth.token);
  }, [auth.token,getOrders]);

  useEffect(() => {
    if (orders) {
      setState(state => {
        return {
          ...state,
          orders,
        }
      });
    }
  }, [orders]);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      setState({
        orders: orders.filter((order) => {
          return order.status === e.target.value;
        }),
        filter: e.target.value,
      });
    } else {
      setState({
        orders: orders,
        filter: "",
      });
    }
  };

  const handlePayment = (orderId) => {
    const order = state.orders.find((order) => order.id === orderId);
    const products = order.products.map((item) => {
      return {
        id: item.id,
        name: item.name,
        quantity: item.orderline.quantity,
        price: item.price,
      };
    });
    payOrder(token, products)
      .then((res) => {
        window.open(res.data, "_blank");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="align-items-center d-flex">
            <FiUser class="mr-2" /> Mi cuenta
          </h1>
        </Col>
      </Row>

      <Row>
        <Col md={4} lg={3}>
          <Card className="bg-dark2 border-0 shadow">
            <Card.Body className="text-center">
              <img
                alt="Avatar"
                width="128"
                height="128"
                className="rounded-circle mb-2"
                src="https://image.freepik.com/vector-gratis/gamer-girl-character-esport-plantilla-logotipo_162048-110.jpg"
              />
              <Card.Title>{user.fullname}</Card.Title>
              <Button variant="primary" onClick={() => logOut()}>
                Cerrar sesión
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Row>
            <Col>
              <Card className="bg-dark2">
                <Card.Header>
                  <Row>
                    <Col>Mis ordenes</Col>
                    <Col className="text-right">
                      <select
                        value={state.filter}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        className="form-control custom-select"
                      >
                        <option value="">Todas las ordenes</option>
                        <option value="created">Creadas</option>
                        <option value="processed">Procesadas</option>
                        <option value="canceled">Canceladas</option>
                        <option value="completed">Completadas</option>
                      </select>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  {state.orders.map((item, index) => (
                    <Row className="border-bottom border-dark py-4">
                      <Col xs={12}>
                        <div
                          key={index}
                          className="p-2 d-flex justify-content-between aling-items-center"
                        >
                          <span className="text-muted">
                            <em>
                              {moment(item.createdAt).format(
                                "DD/MM/YYYY - HH:mm:ss"
                              )}
                            </em>
                          </span>
                          <div>
                            {item.status === "created" && (
                              <span className="badge badge-warning badge-pill">
                                Pendiente de pago
                              </span>
                            )}

                            {item.status === "processed" && (
                              <span className="badge badge-primary badge-pill">
                                Pagada
                              </span>
                            )}

                            {item.status === "completed" && (
                              <span className="badge badge-success badge-pill">
                                Completada
                              </span>
                            )}

                            {item.status === "canceled" && (
                              <span className="badge badge-danger badge-pill">
                                Cancelada
                              </span>
                            )}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        {item.products.map((product, i) => (
                          <div key={i} className="p-3 shadow">
                            <span>
                              <span className="text-muted">{product.name}</span>{" "}
                              <span className="badge badge-dark">
                                {product.orderline.quantity} x $
                                {product.orderline.price}
                              </span>
                            </span>
                            <span>
                              $
                              {product.orderline.quantity *
                                parseFloat(product.orderline.price)}
                            </span>
                          </div>
                        ))}
                      </Col>
                      <Col xs={12}>
                        <div className="pt-3 d-flex justify-content-between aling-items-center">
                          <h3>
                            Total: $
                            {item.products.reduce((acc, curr) => {
                              return (
                                acc +
                                curr.orderline.quantity *
                                  parseFloat(curr.orderline.price)
                              );
                            }, 0)}
                          </h3>
                          <span>
                            {item.status === "created" && (
                              <React.Fragment>
                                <Button
                                  size="sm"
                                  className="mr-1"
                                  variant="success"
                                  onClick={() => handlePayment(item.id)}
                                >
                                  Pagar ahora
                                </Button>
                                <Button
                                  onClick={handleCancel(item.id)}
                                  size="sm"
                                  variant="danger"
                                >
                                  Cancelar
                                </Button>
                              </React.Fragment>
                            )}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    orders: state.usersReducer.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(logout(token)),
    getOrders: (token) => dispatch(getOrders(token)),
    cancelOrder: (data) => dispatch(cancelOrder(data)),
    payOrder: (token, products) => dispatch(payOrder(token, products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
