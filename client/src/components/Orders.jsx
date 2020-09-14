import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orders';
import { Container, Row, Col } from 'react-bootstrap'

function Orders({ getOrders, allOrders }) {

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
                                    <th>Último movimiento</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders && allOrders.map((order, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td>{order.id}</td>
                                            <td>{order.userId ? order.userId : "No disponible"}</td>
                                            {/* Las siguientes dos líneas formatean la fecha recibida de la base de datos para hacerla más amigable */}
                                            <td>{order.createdAt.substr(11, 8) + " - " + order.createdAt.substr(8, 2) + "/" + order.createdAt.substr(5, 2) + "/" + order.createdAt.substr(0, 4)}</td>
                                            <td>{order.updatedAt.substr(11, 8) + " - " + order.updatedAt.substr(8, 2) + "/" + order.updatedAt.substr(5, 2) + "/" + order.updatedAt.substr(0, 4)}</td>
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