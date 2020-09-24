import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, getUserOrders, getUserOrderlines } from '../../actions/users';
import { updateOrderStatus } from '../../actions/orders';
import { Container, Row, Col, Card, Form, Table, Button } from 'react-bootstrap';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import style from '../../styles/userOverview.module.scss';
import moment from 'moment';
import { FiTrash2, FiInfo } from 'react-icons/fi';
import OrderInfo from './OrderInfo';

export function UserOverview({ getUser, user, getUserOrders, orders, getUserOrderlines, orderlines, updateOrderStatus }) {
    const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss"
    const { id } = useParams();
    const { fullname, email, role } = user;
    const [state, setState] = useState({
        newData: false,
        showingInfo: false,
        order: {
            id: "",
            status: "",
            updatedAt: ""
        },
        orderlines: ""
    });

    const handleShowingInfo = (order) => {
        setState({
            ...state,
            showingInfo: !state.showingInfo,
            order: order ? order : { id: "", status: "", updatedAt: "" },
            orderlines: orderlines ? orderlines : ""
        })
    }

    const handleUpdateStatus = () => {
        handleShowingInfo();
        return (orderId, data) => {
            setState({
                ...state,
                newData: true
            })
            updateOrderStatus(orderId, data)
        }
    }

    useEffect(() => {
        getUser(id);
        getUserOrders(id);
        getUserOrderlines(id);
    }, []);

    useEffect(() => {
        getUserOrders(id);
        setState({
            ...state,
            showingInfo: false,
            newData: false
        })
    }, [state.newData === true]);

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="align-items-center d-flex">Control de usuario</h2>
                </Col>
            </Row>
            <Row>
                <Col className="mb-3">
                    <Card className="bg-dark2 border-0 shadow">
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>Usuario N°</Form.Label>
                                <Form.Control value={id} name="id" placeholder="Usuario N°" readOnly disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control value={fullname} name="fullname" placeholder="Nombre" readOnly disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control value={email} name="email" placeholder="Correo electrónico" readOnly disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Form.Control value={role === "client" && ("Usuario") ||
                                    role === "admin" && ("Administrador")} name="role" placeholder="Rol" readOnly disabled />
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={9}>
                    <Tabs>
                        <Card className="bg-dark2">
                            <Card.Header>
                                <TabList className={"list-group list-group-horizontal d-flex justify-content-around " + style["tabList"]}>
                                    <Tab className={style.tab}>Órdenes</Tab>
                                    <Tab className={style.tab}>Reseñas</Tab>
                                </TabList>
                            </Card.Header>
                            <Card.Body className="bg-default">
                                <TabPanel>
                                    <Table className="table table-dark table-sm table-striped table-bordered table-hover">
                                        <thead>
                                            <tr className="text-center">
                                                <th>Orden N°</th>
                                                <th>Creada</th>
                                                <th>Última modificación</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(orders && orders.length > 0) &&
                                                orders.map((order, index) => {
                                                    return (
                                                        <tr key={index} className="text-center">
                                                            <td className="align-middle">{order.id}</td>
                                                            <td className="align-middle">{moment(order.createdAt).format(DATE_FORMAT)}</td>
                                                            <td className="align-middle">{moment(order.updatedAt).format(DATE_FORMAT)}</td>
                                                            <td className="align-middle">
                                                                {
                                                                    order.status === "shopping_cart" && ("En carrito") ||
                                                                    order.status === "created" && ("Creada") ||
                                                                    order.status === "processing" && ("En proceso") ||
                                                                    order.status === "canceled" && ("Cancelada") ||
                                                                    order.status === "completed" && ("Completada")
                                                                }
                                                            </td>
                                                            <td>
                                                                <Button size="sm" onClick={() => handleShowingInfo(order)} className="m-1" title="Ver detalle" variant="info"><FiInfo size="17" /></Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            <OrderInfo show={state.showingInfo} handleClose={handleShowingInfo} updateOrderStatus={handleUpdateStatus} order={state.order} orderlines={state.orderlines} />
                                        </tbody>
                                    </Table>
                                    {(!orders || orders.length < 1) && "No hay órdenes disponibles."}
                                </TabPanel>
                                <TabPanel>
                                    <h2>Any content 2</h2>
                                </TabPanel>
                            </Card.Body>
                        </Card>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        user: state.usersReducer.user,
        orders: state.usersReducer.orders,
        orderlines: state.usersReducer.orderlines
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (id) => dispatch(getUser(id)),
        getUserOrders: (id) => dispatch(getUserOrders(id)),
        getUserOrderlines: (id) => dispatch(getUserOrderlines(id)),
        updateOrderStatus: (orderId, data) => dispatch(updateOrderStatus(orderId, data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserOverview);