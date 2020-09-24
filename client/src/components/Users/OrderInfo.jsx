import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Table, Row, Col, Alert } from 'react-bootstrap';
import { getProducts } from '../../actions/products';
import { connect } from 'react-redux';

export function OrderInfo({ show, handleClose, order, orderlines, getProducts, allProducts, updateOrderStatus }) {
    const { id, status } = order;
    const products = allProducts.rows;
    var totalPrice = 0;

    const [state, setState] = useState({
        id: id,
        status: status
    });

    useEffect(() => {
        getProducts();
    }, [])

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
            <Modal.Header className="border-0 bg-dark2" closeButton>
                <Modal.Title>Detalles de orden N°{id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark2">
                <Table className="table table-dark table-sm table-striped table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(orderlines && orderlines.length > 0) &&
                            orderlines.map((orderline, index) => {
                                if (orderline.orderId === id) {
                                    totalPrice += orderline.price * orderline.quantity;

                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="align-middle">{
                                                (products && products.length > 0) && products.map(product => {
                                                    if (product.id === orderline.productId) {
                                                        console.log(product.image)
                                                        return (
                                                            <Row className="d-flex justify-content-between text-left">
                                                                <Col className="m-0" style={{ maxWidth: "4.4rem" }}>
                                                                    <img style={{ width: "4rem" }} src={JSON.parse(product.images)[0]} alt={product.name} />
                                                                </Col>
                                                                <Col className="m-0 d-flex align-items-center justify-content-center text-center">
                                                                    <span>{product.name}</span>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    }
                                                })

                                            }</td>
                                            <td className="align-middle">{orderline.quantity}</td>
                                            <td className="align-middle">${orderline.price}</td>
                                            <td className="align-middle">${orderline.quantity * orderline.price}</td>
                                        </tr>
                                    )
                                }
                            })}
                    </tbody>
                    <tfoot>
                        <tr className="text-center">
                            <th colSpan="2"></th>
                            <th>Total:</th>
                            <th>${totalPrice}</th>
                        </tr>
                    </tfoot>
                </Table>
                <Alert className="m-0 mb-1 p-2 small" variant="danger" show={state.showingAlert}>Atención: cambiar el estado puede afectar el proceso de compra</Alert>
                <Form.Group>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control as="select" onChange={handleSelect} onClick={() => showAlert()} value={state.status} name="orderStatus" placeholder="Estado de la orden">
                        <option key="1" value="shopping_cart">En carrito</option>
                        <option key="2" value="created">Creada</option>
                        <option key="3" value="processing">En proceso</option>
                        <option key="4" value="canceled">Cancelada</option>
                        <option key="5" value="completed">Completada</option>
                    </Form.Control>
                </Form.Group>
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

function mapStateToProps(state) {
    return {
        allProducts: state.productsReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderInfo);