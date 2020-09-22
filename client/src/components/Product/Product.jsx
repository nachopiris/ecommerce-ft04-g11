import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Carousel, Button, Form } from "react-bootstrap";
import s from "./product.module.scss";
import { CgShoppingCart } from "react-icons/cg";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { getProduct, getReviews, getAverage } from "../../actions/products";
import { addProductToCart as setProductToGuestCart } from '../../actions/guest';
import { setProductToCart, getUserCart } from "../../actions/users";
import Error404 from '../Error404'
import Review from '../Review';
import Rating from 'react-rating';
import { MdStar } from 'react-icons/md';

//***************CONECTADO AL STORE DE REDUX ********************/
export function Product({ reviews, product, getProduct, setProductToCart, setProductToGuestCart, getUserCart, userCart, token, user, guestCart, getReviews, getAverage, avgReviews }) {
    const { id } = useParams();
    var start = true;
    const [state, setState] = useState({
        quantity: 1,
        isAdded: false
    });

    const handleSetToCart = () => {
        if (!token) {
            setProductToGuestCart({ id: id * 1, stock: product.stock, name: product.name, price: product.price, quantity: state.quantity, image: JSON.parse(product.images)[0] })
        } else {
            setProductToCart(id, state.quantity);
        }
    }

    const onChangeQuantity = (e) => {
        let val = e.target.value;
        if (val <= 0) val = 1;
        if (product && val > product.stock) val = product.stock;
        setState({
            ...state,
            quantity: val
        });
    }



    useEffect(() => {
        getUserCart();
        getProduct(id);
        getReviews(id);
        getAverage(id);
    }, []);

    useEffect(() => {
        let currentProduct;
        if (userCart.length && product) {
            currentProduct = userCart.find(item => item.productId === product.id)
        }
        if (guestCart.length && product) {
            currentProduct = guestCart.find(item => item.id === product.id)
        }
        if (currentProduct) {
            setState({
                ...state,
                isAdded: true
            });
        } else {
            setState({
                ...state,
                isAdded: false
            });
        }
    }, [userCart, product, guestCart])

    const { avg, totalReviews } = avgReviews

    return (
        <Container>
            {product ? (
                <React.Fragment>
                    <Row className="mb-4">
                        <Col className="">
                            <Card className="bg-dark2">
                                <Card.Header className="">
                                    <h1 className="">{product.name + " "}</h1>
                                    {product.stock ? (
                                        <span className="badge badge-primary badge-pill text-uppercase">
                                            Stock: {product.stock}
                                        </span>
                                    ) : (
                                            <span className="badge badge-danger badge-pill text-uppercase">
                                                Agotado
                                            </span>
                                        )}
                                </Card.Header>
                                <Card.Body>
                                    <Row>
                                        <Col md={12} lg={4} className="mb-4  text-center">
                                            <Card className="h-100 bg-transparent border-0">
                                                <Card.Body>
                                                    <div className={s["main-img-cover"] + " rounded"}>
                                                        {product.images && (
                                                            <img
                                                                src={JSON.parse(product.images)[0]}
                                                                className="shadow rounded"
                                                            />
                                                        )}
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={12} lg={8} className="mb-4">
                                            <Card className="h-100 bg-transparent border-0">
                                                <Card.Body>
                                                    <Carousel
                                                        className={
                                                            s["bootstrap-carousel"] + " m-auto shadow"
                                                        }
                                                    >
                                                        {product.images &&
                                                            JSON.parse(product.images).map((image, index) => {
                                                                if (index !== 0) {
                                                                    return (
                                                                        <Carousel.Item key={index}>
                                                                            <div
                                                                                className={
                                                                                    s["cover-image"] + " rounded bg-dark"
                                                                                }
                                                                            >
                                                                                <img src={image} />
                                                                            </div>
                                                                        </Carousel.Item>
                                                                    );
                                                                }
                                                            })}
                                                    </Carousel>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                            <Card className="bg-dark2">
                                <Card.Body>
                                    <Row>
                                        <Col className="col-4">
                                            <span className={s.price}>
                                                <NumberFormat
                                                    prefix="$"
                                                    value={product.price}
                                                    decimalScale={2}
                                                    fixedDecimalScale={true}
                                                    displayType={"text"}
                                                />
                                            </span>
                                        </Col>
                                        <Col className="col-3">
                                            {product.stock > 0 && !state.isAdded && (
                                                <Form.Control
                                                    value={state.quantity}
                                                    onChange={onChangeQuantity}
                                                    min="1"
                                                    max={product.stock}
                                                    type="number"
                                                    className="form-control-lg"
                                                />
                                            )}
                                        </Col>
                                        <Col>

                                            {product.stock > 0 && !state.isAdded && (<Button onClick={handleSetToCart} size="lg" block variant="primary">
                                                <CgShoppingCart className="mr-1" />
                          Agregar al carrito
                                            </Button>)}

                                            {product.stock > 0 && state.isAdded && (<div>
                                                <Link to="/carrito" className="btn btn-primary btn-lg btn-block">
                                                    <CgShoppingCart className="mr-1" />
                          Ir al carrito
                      </Link>
                                                <small>Ya añadiste este producto al carrito</small>
                                            </div>)}

                                            {product.stock < 1 && (
                                                <Button size="lg" block variant="primary" disabled>
                                                    ¡Producto agotado!
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                            <Card className="border-0 bg-dark2">
                                <Card.Header>Descripción</Card.Header>
                                <Card.Body>
                                    <p className="lead">{product.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col>
                            <Card className="bg-dark">
                                <Card.Header className="d-flex justify-content-between">Reseñas <Rating
                                    initialRating={avg}
                                    readonly="true"
                                    emptySymbol={<MdStar style={{ color: "grey", fontSize: "1.5rem" }} />}
                                    fullSymbol={<MdStar style={{ color: "#ffb900", fontSize: "1.5rem" }} />}
                                /></Card.Header>
                                <Card.Body>
                                    <small className="d-flex flex-row-reverse">{avgReviews && totalReviews === 1 ? totalReviews + " calificación" : totalReviews + " calificaciones"}</small>
                                    {(reviews.length > 0) ? reviews.map(review => (
                                        <Review props={review} />
                                    )) :
                                        <span>No hay comentarios sobre este producto</span>}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="bg-dark">
                                <Card.Header>Categorías</Card.Header>
                                <Card.Body>
                                    {product.categories &&
                                        product.categories.map((item) => (
                                            <Link
                                                to="#"
                                                className="text-muted2 m-1 badge badge-dark2 badge-pill"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </React.Fragment>
            ) : <Error404 />}
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        avgReviews: state.productsReducer.avgReviews,
        reviews: state.productsReducer.reviews,
        product: state.productsReducer.product,
        userCart: state.usersReducer.userCart,
        guestCart: state.guestReducer.cart,
        token: state.authReducer.token,
        user: state.authReducer.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProduct: (value) => dispatch(getProduct(value)),
        setProductToCart: (productId, quantity) => dispatch(setProductToCart(productId, quantity)),
        getUserCart: () => dispatch(getUserCart()),
        setProductToGuestCart: (product) => dispatch(setProductToGuestCart(product)),
        getReviews: (id) => dispatch(getReviews(id)),
        getAverage: (id) => dispatch(getAverage(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
