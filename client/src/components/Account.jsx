import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logout } from '../actions/auth';
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { FiUser } from "react-icons/fi";
import { getOrders } from "../actions/users";
import { cancelOrder } from '../actions/checkout';
import moment from 'moment';

function Account({ auth, logout, orders, getOrders, cancelOrder}) {
    const { user, token } = auth;
    const logOut = () => {
        logout(token).then(()=>{
            localStorage.clear();
            window.location.reload();
        });
    }

    const handleCancel = (id) => {
        return () => {
            cancelOrder({token: auth.token, orderId:id}).then(() => {
                getOrders(auth.token);
            });
        }
    }

    const [state, setState] = useState({
        orders: []
    });

    useEffect(() => {
        getOrders(auth.token);
    },[])

    useEffect(() => {
        if(orders){
            setState({
                ...state,
                orders
            })
        }
    }, [orders]);

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
                                width="128"
                                height="128"
                                className="rounded-circle mb-2"
                                src="https://image.freepik.com/vector-gratis/gamer-girl-character-esport-plantilla-logotipo_162048-110.jpg"
                            />
                            <Card.Title>{user.fullname}</Card.Title>
                            <Button variant="primary" onClick={() => logOut()}>Cerrar sesión</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Card className="bg-dark2">
                                <Card.Header className>
                                    Mis ordenes
                                </Card.Header>
                                <Card.Body>
                                    {state.orders.map((item, index) => (
                                        <div key={index} className="p-2 d-flex justify-content-between aling-items-center">

                                            <span className="text-muted">
                                                <em>{moment(item.createdAt).format("DD/MM/YYYY - HH:mm:ss")}</em>
                                            </span>
                                            <div>
                                                {item.status === 'created' && (
                                                    <span className="badge badge-warning badge-pill">
                                                        Pendiente de pago
                                                    </span>
                                                )}

                                                {item.status === 'processed' && (
                                                    <span className="badge badge-primary badge-pill">
                                                        Pagada
                                                    </span>
                                                )}


                                                {item.status === 'completed' && (
                                                    <span className="badge badge-success badge-pill">
                                                        Completada
                                                    </span>
                                                )}


                                                {item.status === 'canceled' && (
                                                    <span className="badge badge-danger badge-pill">
                                                        Cancelada
                                                    </span>
                                                )} 
                                            </div>
                                            <span>
                                                {item.status === 'created' && (
                                                    <React.Fragment>
                                                        <Button size="sm" className="mr-1" variant="success">
                                                            Pagar ahora
                                                        </Button>
                                                        <Button onClick={handleCancel(item.id)} size="sm" variant="danger">
                                                            Cancelar
                                                        </Button>
                                                    </React.Fragment>
                                                )} 
                                            </span>

                                        </div>
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
        orders: state.usersReducer.orders
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: token => dispatch(logout(token)),
        getOrders: token => dispatch(getOrders(token)),
        cancelOrder: data => dispatch(cancelOrder(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
