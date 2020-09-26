import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Table, Row, Col, Alert } from 'react-bootstrap';

export default function OrderInfo({ show, handleClose, order, orderlines, allProducts, updateOrderStatus }) {
    const { id, status } = order;
    const products = allProducts.rows;
    var totalPrice = 0;

    const [state, setState] = useState({
        id: id,
        status: status
    });

    useEffect(() => {
        setState({
            id: id,
            status: status,
            showingAlert: false
        });
    }, [order]);

    const handleSelect = (e) => {
        setState({
            ...state,
            status: e.target.value
        })
    }

    const showAlert = () => {
        setState({
            ...state,
            showingAlert: true
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="border-0 bg-dark2 pb-0" closeButton>
                <Modal.Title>Detalles de orden N°{id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark2">
                <Alert className="m-0 mb-1 p-2 small" variant="danger" show={state.showingAlert}>Atención: cambiar el estado puede afectar el proceso de compra</Alert>
                <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control as="select" onChange={handleSelect} onClick={() => showAlert()} value={state.status} name="orderStatus" placeholder="Estado de la orden">
                        <option key="1" value="created">Creada</option>
                        <option key="2" value="processing">En proceso</option>
                        <option key="3" value="canceled">Cancelada</option>
                        <option key="4" value="completed">Completada</option>
                    </Form.Control>
                </Form.Group>
                <div className="overflow-auto" style={{ maxHeight: '190px' }}>
                    <ul>
                        {(orderlines && orderlines.length > 0) &&
                            orderlines.map((orderline, index) => {
                                if (orderline.orderId === id) {
                                    totalPrice += orderline.price * orderline.quantity;
                                    return (
                                        <li key={index} className="my-3 p-2 shadow-sm">
                                            <div className="d-flex justify-content-between ">
                                                {products && products.length > 0 &&
                                                    products.map(product => {
                                                        if (product.id === orderline.productId) {
                                                            return (
                                                                <span>
                                                                    {product.name}<br />
                                                                    <span className="text-muted">{orderline.quantity} x ${orderline.price}</span>
                                                                </span>
                                                            )
                                                        }
                                                    })}
                                                <b>${(orderline.quantity * orderline.price).toFixed(2)}</b>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div className="text-right p-3">
                    <span>Total</span><br />
                    <span className="h4"><b>${totalPrice.toFixed(2)}</b></span>
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between border-0 bg-dark2">
                <Button variant="danger" onClick={handleClose}>
                    Cancelar
              </Button>
                <Button variant="success" onClick={() => updateOrderStatus()(id, state)} >
                    Guardar
              </Button>
            </Modal.Footer>
        </Modal >
    );
}