import React, { useEffect, useRef } from "react";
import { Container, Row, Button } from "react-bootstrap";
import config from "../config";
import s from "../styles/homePage.module.scss";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import { connect } from "react-redux";
import { getLatests } from "../actions/products";
import { setProductToCart, getUserCart } from "../actions/users";
import {addProductToCart as setProductToGuestCart} from '../actions/guest' ;
import ProductsHomepage from './ProductsHomepage';

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
        if(!!token) getUserCart(token);
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
            {products.rows && <ProductsHomepage setToCart={handleSetToCart()} token={token} isGuest={!!!token} guestCart={guestCart} products={products.rows} />}
        </Container>
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
        setProductToCart: (data) => dispatch(setProductToCart(data)),
        getUserCart: (token) => dispatch(getUserCart(token)),
        setProductToGuestCart: product => dispatch(setProductToGuestCart(product))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
