import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getOrders, removeOrder, updateOrder } from '../actions/orders';
import { Container, Row, Col, Button, Modal, Alert, Form } from 'react-bootstrap'
import moment from 'moment';
import { FiTrash2, FiEdit3, FiEye } from 'react-icons/fi';

function Orders({ getOrders, orders, removeOrder, token, updateOrder }) {

    const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss"
    const [state, setState] = useState({
        deleting: false,
        updating: false,
        orders: []
    });

    useEffect(() => {
        getOrders();
    }, []);

    const handleDelete = (id) => {
        return () => {
            setState({
                ...state,
                deleting: !state.deleting ? id : false
            })
        }
    }

    const handleUpdate = (id) => {
        return () => {
            setState({
                ...state,
                updating: !state.updating ? id : false
            })
        }
    }


    useEffect(() => {
        setState({
            ...state,
            orders: orders || []
        });
    }, [orders]);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="d-flex p-2 justify-content-between aling-items-center">
                        <h1>Órdenes</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="table-responsive" >
                        <table className="table table-dark table-sm table-striped table-bordered table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th>Orden N°</th>
                                    <th>Creada por</th>
                                    <th>Fecha de creación</th>
                                    <th>Última modificación</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.orders && state.orders.map((order, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td>{order.id}</td>
                                            <td>{order.user ? order.user.email : "No disponible"}</td>
                                            {/* Las siguientes dos líneas formatean la fecha recibida de la base de datos para hacerla más amigable */}
                                            <td>{moment(order.createdAt).format(DATE_FORMAT)}</td>
                                            <td>{order.createdAt === order.updatedAt ? "Sin modificaciones" : moment(order.updatedAt).format(DATE_FORMAT)}</td>
                                            {/* Acá cambiamos el texto del valor recibido */}
                                            <td>{order.status === "shopping_cart" && ("En carrito") ||
                                                order.status === "created" && ("Creada") ||
                                                order.status === "processing" && ("Procesada / Pagada") ||
                                                order.status === "canceled" && ("Cancelada") ||
                                                order.status === "completed" && ("Completada")}</td>
                                            <td>
                                                {state.deleting === order.id && <DeleteModal
                                                    token={token}
                                                    order={order}
                                                    show={!!state.deleting}
                                                    removeOrder={removeOrder}
                                                    handleClose={handleDelete(order.id)}
                                                />}

                                                {state.updating === order.id && <UpdateModal
                                                    token={token}
                                                    order={order}
                                                    show={!!state.updating}
                                                    updateOrder={updateOrder}
                                                    handleClose={handleUpdate(order.id)}
                                                />}

                                                <Button onClick={handleUpdate(order.id)} variant="warning" size="sm">
                                                    <FiEye /> | <FiEdit3 />
                                                </Button>
                                                <Button onClick={handleDelete(order.id)} variant="danger ml-1" size="sm">
                                                    <FiTrash2 />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                        {state.orders.length < 1 && (<div className="alert alert-info">No hay órdenes creadas.</div>)}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

function UpdateModal({ token, order, updateOrder, show, handleClose }) {
    const [state, setState] = useState({
        total: 0,
        user: null,
        order_status: order.status
    });

    const handleUpdate = () => {
        handleClose();
        updateOrder({ id: order.id, status: state.order_status, token }).then(() => {
        });
    }

    const handleSelect = (e) => {
        setState({
            ...state,
            order_status: e.target.value
        });
    }

    useEffect(() => {
        if (order.products) {
            let products = order.products;
            let total = products.reduce((total, item) => total + item.orderline.quantity * item.orderline.price, 0);
            console.log(total);
            setState({
                ...state,
                total
            });
        }
    }, []);


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-dark2 border-0 text-white pb-0">
                <Modal.Title className="mb-0">Modificar estado de la orden</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-dark2">
                {state.order_status === 'shopping_cart' &&
                    <Alert variant="warning">
                        <b>Con cuidado</b>. Si se modifica una orden en estado carrito a cualquier otro estado o al
                        revés (de cualquier otro estado a estado carrito) podrá generar una muy mala experiencia para el usuario.
                    </Alert>
                }
                <Form.Group>
                    <Form.Control as="select" name="status" onChange={handleSelect} defaultValue={order.status}>
                        <option value="shopping_cart">En carrito</option>
                        <option value="created">Creada</option>
                        <option value="processing">Procesada / pagada</option>
                        <option value="completed">Completada</option>
                        <option value="canceled">Cancelada</option>
                    </Form.Control>
                </Form.Group>
                <div className="overflow-auto" style={{ maxHeight: '190px' }}>
                    <ul>
                        {order.products && order.products.map((item, index) => (
                            <li key={index} className="my-3 p-2 shadow-sm">
                                <div className="d-flex justify-content-between ">
                                    <span>
                                        {item.name}
                                        <br />
                                        <span className="text-muted">{item.orderline.quantity} x ${item.orderline.price}</span>
                                    </span>
                                    <span></span>
                                    <b>${(item.orderline.quantity * item.orderline.price).toFixed(2)}</b>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-right p-3">
                    <span>Total</span>
                    <br />
                    <span className="h4"><b>${state.total.toFixed(2)}</b></span>
                </div>
            </Modal.Body>

            <Modal.Footer className="bg-dark2 border-0">
                <Button variant="secondary" onClick={handleClose} >Cancelar</Button>
                <Button onClick={handleUpdate} variant="warning">Confirmar</Button>
            </Modal.Footer>
        </Modal>
    );
}

function DeleteModal({ token, order, removeOrder, show, handleClose }) {

    const [state, setState] = useState({
        total: 0,
        user: null
    });

    useEffect(() => {
        let products = order.products;
        let total = products.reduce((total, item) => total + item.orderline.quantity * item.orderline.price, 0);
        console.log(total);
        setState({
            ...state,
            total
        });
    }, []);

    const handleRemove = () => {
        handleClose();
        removeOrder({ id: order.id, token }).then(() => {
        });
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="bg-dark2 border-0 text-white pb-0">
                <Modal.Title className="mb-0">Borrar orden</Modal.Title>
            </Modal.Header>

            <Modal.Body className="bg-dark2">
                <Alert variant="danger">
                    Una vez eliminada la orden no habrá vuelta atrás. Considera contactar al usuario previa o posteriormente.
                </Alert>
                <div className="overflow-auto" style={{ maxHeight: '190px' }}>
                    <ul>
                        {order.products && order.products.map((item, index) => (
                            <li key={index} className="my-3 p-2 shadow-sm">
                                <div className="d-flex justify-content-between ">
                                    <span>
                                        {item.name}
                                        <br />
                                        <span className="text-muted">{item.orderline.quantity} x ${item.orderline.price}</span>
                                    </span>
                                    <span></span>
                                    <b>${(item.orderline.quantity * item.orderline.price).toFixed(2)}</b>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-right p-3">
                    <span>Total</span>
                    <br />
                    <span className="h4"><b>${state.total.toFixed(2)}</b></span>
                </div>
                <p className="text-center">¿Está seguro que desea borrar <b>definitivamente</b> la orden del usuario <b>{order.user && order.user.fullname}</b>?</p>
            </Modal.Body>

            <Modal.Footer className="bg-dark2 border-0">
                <Button variant="secondary" onClick={handleClose} >Cancelar</Button>
                <Button onClick={handleRemove} variant="danger">Confirmar</Button>
            </Modal.Footer>
        </Modal>
    );
}


function mapStateToProps(state) {
    return {
        orders: state.ordersReducer.orders,
        token: state.authReducer.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: () => dispatch(getOrders()),
        removeOrder: data => dispatch(removeOrder(data)),
        updateOrder: data => dispatch(updateOrder(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);