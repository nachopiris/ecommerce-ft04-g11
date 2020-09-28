import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUser, getUserOrders, getUserOrderlines, getUserReviews, deleteReview, updateUser, giveAdminRights, giveUserRights } from '../../actions/users';
import { getProducts } from '../../actions/products';
import { updateOrderStatus } from '../../actions/orders';
import { Container, Row, Col, Card, Form, Table, Button } from 'react-bootstrap';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import style from '../../styles/userOverview.module.scss';
import moment from 'moment';
import { FiTrash2, FiInfo } from 'react-icons/fi';
import { MdStar } from 'react-icons/md';
import OrderInfo from './OrderInfo';
import DeleteReview from './DeleteReview';
import EditUser from './EditUser';
import Rating from 'react-rating';
import 'moment/locale/es';

export function UserOverview({ getUser, user, getUserOrders, orders, getUserOrderlines, orderlines, updateOrderStatus, getUserReviews, reviews, getProducts, allProducts, deleteReview, updateUser, giveAdminRights, giveUserRights }) {
    moment.locale('es');
    const REVIEW_DATE_FORMAT = "DD [de] MMMM [del] YYYY";
    const DATE_FORMAT = "DD/MM/YYYY - HH:mm:ss"
    const { id } = useParams();

    let _user = user;
    if(_user.role === 'client') _user.role = 'Usuario';
    if(_user.role === 'admin') _user.role = 'Administrador';

    const { fullname, email, role} = _user;

    const products = allProducts.rows;
    var product = {};
    const [state, setState] = useState({
        newData: false,
        showingInfo: false,
        reviewDeleting: false,
        order: {
            id: "",
            status: "",
            updatedAt: ""
        },
        orderlines: "",
        review: {},
        editing: false,
        user: {
            id: "",
            fullname: "",
            email: "",
            role: "",
            address: "",
            doc_number: "",
            phone: ""
        }
    });

    const handleShowingInfo = (order) => {
        setState({
            ...state,
            showingInfo: !state.showingInfo,
            order: order ? order : { id: "", status: "", updatedAt: "" },
            orderlines: orderlines ? orderlines : ""
        })
    }

    const handleReviewDeleting = (review) => {
        setState({
            ...state,
            reviewDeleting: !state.reviewDeleting,
            review: review ? review : {}
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

    const confirmReviewDelete = () => {
        handleReviewDeleting();
        return (idReview) => {
            setState({
                ...state,
                newData: true
            })
            deleteReview(idReview)
        }
    }

    const handleEditing = (user) => {
        setState({
            ...state,
            editing: !state.editing,
            user: user ? user : { id: "", fullname: "", email: "", role: "", address: "", doc_number: "", phone: "" }
        })
    }

    const handleUpdate = () => {
        handleEditing();
        return (id, data) => {
            setState({
                ...state,
                newData: true
            })
            updateUser(id, data)
        }
    }

    const updateToAdminRights = () => {
        return (id) => {
            setState({
                ...state,
                newData: true
            })
            giveAdminRights(id)
        }
    }

    const updateToUserRights = () => {
        return (id) => {
            setState({
                ...state,
                newData: true
            })
            giveUserRights(id)
        }
    }

    useEffect(() => {
        getUser(id);
        getUserOrders(id);
        getUserOrderlines(id);
        getUserReviews(id);
        getProducts();
    }, [id,getUser,getUserOrders,getUserOrderlines,getUserReviews,getProducts]);

    useEffect(() => { 
        if(!state.newData) return;
        getUserOrders(id);
        getUserReviews(id);
        getUser(id);
        setState({
            ...state,
            showingInfo: false,
            editing: false,
            reviewDeleting: false,
            newData: false
        })
    }, [state.newData,id,getUserOrders,getUserReviews,getUser, state]);

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
                                <Form.Control defaultValue={fullname} name="fullname" placeholder="Nombre" readOnly disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control defaultValue={email} name="email" placeholder="Correo electrónico" readOnly disabled />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Rol</Form.Label>
                                <Form.Control defaultValue={role} name="role" placeholder="Rol" readOnly disabled />
                            </Form.Group>
                            <Button onClick={() => handleEditing(user)} className="w-100" title="Modificar" variant="warning">Editar</Button>
                            <EditUser show={state.editing} updateUser={handleUpdate} giveAdminRights={updateToAdminRights} giveUserRights={updateToUserRights} handleClose={handleEditing} user={state.user} />
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
                                <TabPanel className="text-center">
                                    {(orders && orders.length > 0) ?
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
                                                {orders.map((order, index) => {
                                                    return (
                                                        <tr key={index} className="text-center">
                                                            <td className="align-middle">{order.id}</td>
                                                            <td className="align-middle">{moment(order.createdAt).format(DATE_FORMAT)}</td>
                                                            <td className="align-middle">{moment(order.updatedAt).format(DATE_FORMAT)}</td>
                                                            <td className="align-middle">
                                                                {
                                                                    (order.status === "shopping_cart" && ("En carrito")) ||
                                                                    (order.status === "created" && ("Creada")) ||
                                                                    (order.status === "processing" && ("En proceso")) ||
                                                                    (order.status === "canceled" && ("Cancelada")) ||
                                                                    (order.status === "completed" && ("Completada"))
                                                                }
                                                            </td>
                                                            <td>
                                                                <Button size="sm" onClick={() => handleShowingInfo(order)} className="m-1" title="Ver detalle" variant="info"><FiInfo size="17" /></Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                <OrderInfo show={state.showingInfo} handleClose={handleShowingInfo} updateOrderStatus={handleUpdateStatus} allProducts={allProducts} order={state.order} orderlines={state.orderlines} />
                                            </tbody>
                                        </Table> :
                                        "No hay órdenes disponibles"
                                    }
                                </TabPanel>
                                <TabPanel className="text-center">
                                    {(reviews && reviews.length > 0) ?
                                        <React.Fragment>
                                            {reviews.map(review => (
                                                <Card key={review.id} className="bg-dark mb-2 position-relative">
                                                    <div style={{ zIndex: "1", position: "absolute", top: ".4rem", right: ".4rem" }}>
                                                        <Button size="sm" onClick={() => handleReviewDeleting(review)} className="m-1" title="Borrar" variant="danger"><FiTrash2 /></Button>
                                                        <DeleteReview show={state.reviewDeleting} handleClose={handleReviewDeleting} deleteReview={confirmReviewDelete} review={review} />
                                                    </div>
                                                    <Card.Body className="text-left">
                                                        <Card.Text>
                                                            <Row>
                                                                <Col md="3">
                                                                    #{review.id} en {
                                                                        (products && products.length > 0) &&
                                                                        (product = products.find(product => product.id === review.productId)) &&
                                                                        <Link className="text-white" to={'/productos/' + product.id}>{product.name}</Link>
                                                                    }
                                                                </Col>
                                                                <Col>
                                                                    <Rating
                                                                        initialRating={review.rating}
                                                                        readonly="true"
                                                                        emptySymbol={<MdStar style={{ color: "grey", fontSize: "1.5rem" }} />}
                                                                        fullSymbol={<MdStar style={{ color: "#ffb900", fontSize: "1.5rem" }} />}
                                                                    /><br />
                                                                    <span>{review.description}</span><br />
                                                                    <small>Publicada el {moment(review.createdAt).format(REVIEW_DATE_FORMAT)}</small><br />
                                                                </Col>
                                                            </Row>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            ))}
                                        </React.Fragment> :
                                        "No hay reseñas disponibles"
                                    }
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
        orderlines: state.usersReducer.orderlines,
        reviews: state.usersReducer.reviews,
        allProducts: state.productsReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (id) => dispatch(getUser(id)),
        getUserOrders: (id) => dispatch(getUserOrders(id)),
        getUserOrderlines: (id) => dispatch(getUserOrderlines(id)),
        updateOrderStatus: (orderId, data) => dispatch(updateOrderStatus(orderId, data)),
        getUserReviews: (id) => dispatch(getUserReviews(id)),
        getProducts: () => dispatch(getProducts()),
        deleteReview: (idReview) => dispatch(deleteReview(idReview)),
        updateUser: (id, data) => dispatch(updateUser(id, data)),
        giveAdminRights: (id) => dispatch(giveAdminRights(id)),
        giveUserRights: (id) => dispatch(giveUserRights(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserOverview);