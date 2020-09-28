import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Error404 from './Error404';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { getUsers } from '../actions/users';
import { getOrders } from '../actions/orders';
import { getProducts } from '../actions/products';
import { getCategories } from '../actions/categories';

export function Admin({ auth, users, getUsers, orders, getOrders, products, getProducts, categories, getCategories }) {
    const { user } = auth;

    useEffect(() => {
        getUsers();
        getOrders();
        getProducts();
        getCategories();
    }, [])

    return user.role === 'admin' ? (
        <Container>
            <h2>Bienvenido {user.fullname}</h2>
            <Row>
                <Col>
                    <Card>
                        <Card.Body className="text-dark text-center font-weight-bold">
                            <Card.Title>Usuarios</Card.Title>
                            <span>Hay {users.length} usuarios registrados</span>
                            <Link to="/admin/usuarios"><Button className="mt-2">Ver usuarios</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body className="text-dark text-center font-weight-bold">
                            <Card.Title>Órdenes</Card.Title>
                            <span>Hay {orders.length} órdenes creadas</span>
                            <Link to="/admin/ordenes"><Button className="mt-2">Ver órdenes</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body className="text-dark text-center font-weight-bold">
                            <Card.Title>Productos</Card.Title>
                            <span>Hay {products.rows.length} productos listados</span>
                            <Link to="/admin/productos"><Button className="mt-2">Ver productos</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body className="text-dark text-center font-weight-bold">
                            <Card.Title>Categorías</Card.Title>
                            <span>Hay {categories.length} categorías creadas</span>
                            <Link to="/admin/categorias"><Button className="mt-2">Ver categorías</Button></Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    )
        : (<Error404 />)
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        users: state.usersReducer.users,
        orders: state.ordersReducer.orders,
        products: state.productsReducer.products,
        categories: state.categoriesReducer.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => dispatch(getUsers()),
        getOrders: () => dispatch(getOrders()),
        getProducts: () => dispatch(getProducts()),
        getCategories: () => dispatch(getCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);