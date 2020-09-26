import React from 'react';
import { connect } from 'react-redux';
import { Button, Row } from 'react-bootstrap';
import s from "../styles/homePage.module.scss";
import AliceCarousel from "react-alice-carousel";
import { CgShoppingCart } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FiCheck } from 'react-icons/fi';

function ProductsHomepage({ products, userCart, setToCart, isGuest, guestCart, token }) {

    const isAdded = (id) => {

        if (!isGuest) return userCart.products.find(item => item.id === id) ? true : false;
        return guestCart.find(item => item.id === id) ? true : false;
    }

    const handleSetToCart = ({ id, name, images, price, stock }) => {
        if (!isGuest) {
            return () => setToCart({ productId: id, quantity: 1, token })
        }
        return () => setToCart({ id, name, stock, image: JSON.parse(images)[0], price, quantity: 1 });
    }
    var items = products
        .map((item, index) => (
            <div
                key={index}
                className={"text-decoration-none text-light " + s["carousel-item"]}
            >
                <div className={s["cover-carousel"]}>
                    <img
                        alt={'Imagen del producto: ' + item.name}
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
        userCart: state.usersReducer.userCart,
        token: state.authReducer.token,
        guestCart: state.guestReducer.cart
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHomepage);