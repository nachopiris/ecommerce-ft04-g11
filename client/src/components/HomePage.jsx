import React, { useEffect, useRef } from "react";
import { Container, Row, Button } from "react-bootstrap";
import config from "../config";
import s from "../styles/homePage.module.scss";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import AliceCarousel from "react-alice-carousel";
import { CgShoppingCart } from "react-icons/cg";
import { connect } from "react-redux";
import { getLatests } from "../actions/products";
import { setProductToCart, getUserCart } from "../actions/users";
import { FiCheck } from 'react-icons/fi';
import {addProductToCart as setProductToGuestCart} from '../actions/guest' ;

const APP_NAME = config.app.name;

function TextIntro() {
    const props = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },

        delay: 200,

        config: {
            duration: 800,
        },
    });
    return (
        <animated.p style={props}>
            <em>"Soy lo que los dioses han hecho de mi"</em> - Kratos
        </animated.p>
    );
}

function ShowAppName() {
    const props = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,
        },
        delay: 100,
        config: {
            duration: 800,
        },
    });
    const propsWhite = useSpring({
        from: {
            textShadow: "0px 0px 0px transparent",
        },
        to: {
            textShadow: "0px 0px 10px white",
        },
        delay: 300,
        config: {
            duration: 1500,
        },
    });
    const propsRed = useSpring({
        from: {
            textShadow: "0px 0px 0px transparent",
        },
        to: {
            textShadow: "0px 0px 10px red",
        },
        delay: 300,
        config: {
            duration: 1500,
        },
    });
    return (
        <animated.h1 className="lg" style={props}>
            <animated.span style={propsWhite}>Origin</animated.span>
            <animated.span style={propsRed} className="text-redGamer">
                Master
      </animated.span>
        </animated.h1>
    );
}

function ExploreButton() {
    const props = useSpring({
        from: {
            opacity: 0,
            transform: "scale(0.5)",
        },
        to: {
            opacity: 1,
            transform: "scale(1)",
        },

        delay: 500,
        config: {
            duration: 600,
        },
    });
    return (
        <animated.div style={props}>
            <Link
                to="/catalogo"
                className={s["kewx"] + " btn btn-primary shadow btn-lg"}
            >
                Catálogo completo
      </Link>
        </animated.div>
    );
}

function HomePage({ products, getLatests, setProductToCart, getUserCart, userCart, guestCart, setProductToGuestCart, token, user}) {
    const props = useSpring({
        from: {
            filter: "brightness(1.5)",
        },
        to: {
            filter: "brightness(0.65)",
        },

        config: {
            duration: 1200,
        },
    });

    useEffect(() => {
        getLatests();
        if(!!token) getUserCart();
    }, []);

    const handleSetToCart = () => {
        if(!!token) return setProductToCart;
        return setProductToGuestCart;
    }

    return (
        <Container fluid>
            <Row className={s["main-section"] + " " + s["section"]}>
                <animated.div
                    style={props}
                    className={"overflow-hidden " + s["cover-main"]}
                >
                    <img src="https://images.hdqwalls.com/wallpapers/thanos-vs-kratos-jt.jpg" />
                </animated.div>
                <div className={s["main-inside"]}>
                    <ShowAppName />
                    <TextIntro />
                    <ExploreButton />
                </div>
            </Row>
            {products.rows && <Gallery setToCart={handleSetToCart()} isGuest={!!!token} guestCart={guestCart} userCart={userCart} products={products.rows} />}
        </Container>
    );
}

function Gallery({ products, userCart, setToCart, isGuest, guestCart }) {
    const handleOnDragStart = (e) => e.preventDefault();
    useEffect(() => { }, []);

    const isAdded = (id) => {

        if(!isGuest) return userCart.find(item => item.productId === id) ? true : false;
        return guestCart.find(item => item.id === id) ? true : false;
    }

    const handleSetToCart = ({id, name, images, price, stock}) => {
        if(!isGuest) {
            return () => setToCart(id, 1)
        }
        return () => setToCart({id, name, stock, image: JSON.parse(images)[0], price, quantity:1});
    }
    var items = products
        .map((item, index) => (
            <div
                key={index}
                className={"text-decoration-none text-light " + s["carousel-item"]}
            >
                {console.log(item)}
                <div className={s["cover-carousel"]}>
                    <img
                        src={JSON.parse(item.images)[1] || JSON.parse(item.images)[0]}
                        className={s["perspective"]}
                    />
                </div>
                <span className="mb-4 mt-auto">{item.name}</span>
                <span className="mt-auto mb-4">
                    {!isAdded(item.id) && <Button onClick={handleSetToCart(item)} variant="light">
                        <CgShoppingCart />
                    </Button>}

                    {isAdded(item.id) && <Link to="/carrito" className="btn btn-light border-0">
                        <span className="text-primary"><FiCheck /></span>
                        <CgShoppingCart />
                    </Link>}
                    <Link
                        to={"/productos/" + item.id}
                        className="ml-1 btn btn-outline-light"
                    >
                        Detalles
          </Link>
                </span>
            </div>
        ))
        .concat(
            <div className={s["carousel-item"]}>
                <h2 className="mb-0">
                    <p className={s["kewx"]}>Explorá</p>
                </h2>
                <p className={s.kewx}>Mirá nuestro catálogo completo!</p>
                <Link
                    to="/catalogo"
                    className={s["kewx"] + " px-5 btn btn-outline-primary mb-4 btn-lg"}
                >
                    Ver todos
        </Link>
            </div>
        );

    return (
        <Row className={s["section2"]}>
            <AliceCarousel
                mouseTrackingEnabled
                mouseDragEnabled
                items={items}
                infinite={false}
                responsive={{ 0: { items: 2 }, 500: { items: 3 }, 1024: { tems: 6 } }}
                dotsDisabled
                buttonsDisabled
            />
        </Row>
    );
}

function mapStateToProps(state) {
    return {
        products: state.productsReducer.products,
        userCart: state.usersReducer.userCart,
        token: state.authReducer.token,
        user: state.authReducer.user,
        guestCart: state.guestReducer.cart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getLatests: () => dispatch(getLatests()),
        setProductToCart: (productId, quantity) => dispatch(setProductToCart(productId, quantity)),
        getUserCart: () => dispatch(getUserCart()),
        setProductToGuestCart: product => dispatch(setProductToGuestCart(product))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
