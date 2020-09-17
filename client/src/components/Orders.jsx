import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orders';
import { Container, Row, Col } from 'react-bootstrap'
import moment from 'moment';

function Orders({ getOrders, allOrders }) {

    const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss"

    useEffect(() => {
        getOrders();
    }, []);

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
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders && allOrders.map((order, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            {console.log(order)}
                                            <td>{order.id}</td>
                                            <td>{order.user ? order.user.email : "No disponible"}</td>
                                            {/* Las siguientes dos líneas formatean la fecha recibida de la base de datos para hacerla más amigable */}
                                            <td>{moment(order.createdAt).format(DATE_FORMAT)}</td>
                                            <td>{order.createdAt === order.updatedAt ? "Sin modificaciones" : moment(order.updatedAt).format(DATE_FORMAT)}</td>
                                            {/* Acá cambiamos el texto del valor recibido */}
                                            <td>{order.status === "shopping_cart" && ("En carrito") ||
                                                order.status === "created" && ("Creada") ||
                                                order.status === "processing" && ("En proceso") ||
                                                order.status === "canceled" && ("Cancelada") ||
                                                order.status === "completed" && ("Completada")}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                        {!allOrders && (<div className="alert alert-info">No hay órdenes creadas.</div>)}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        allOrders: state.ordersReducer.orders,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);