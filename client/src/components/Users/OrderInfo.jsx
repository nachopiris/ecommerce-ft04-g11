import React, { useEffect } from 'react';
import { Modal, Button, Form, Table, Row, Col } from 'react-bootstrap';
import { getProducts } from '../../actions/products';
import { connect } from 'react-redux';

export function OrderInfo({ show, handleClose, order, orderlines, getProducts, allProducts }) {
    const { id, status } = order;
    const products = allProducts.rows;
    var totalPrice = 0;

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className="border-0 bg-dark2" closeButton>
                <Modal.Title>Detalles de orden N°{id}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark2">
                <Table className="table table-dark table-sm table-striped table-bordered table-hover">
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
                            <th></th>
                            <th></th>
                            <th>Total:</th>
                            <th>${totalPrice}</th>
                        </tr>
                    </tfoot>
                </Table>
                <Form.Group>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between border-0 bg-dark2">
                <Button variant="danger">
                    Cancelar
              </Button>
                <Button variant="success">
                    Guardar
              </Button>
            </Modal.Footer>
        </Modal>
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