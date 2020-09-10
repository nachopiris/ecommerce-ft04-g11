import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import config from "../config";
import s from "../styles/homePage.module.scss";
import TextyAnim from "rc-texty";
import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
import { useSpring, animated } from "react-spring";
import AliceCarousel from "react-alice-carousel";
import { CgShoppingCart } from "react-icons/cg";
import { connect } from "react-redux";
import { getLatests } from "../actions/products";

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
  return <animated.h1 style={props}>{APP_NAME}</animated.h1>;
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
        className={s["kewx"] + " btn btn-danger shadow btn-lg"}
      >
        Catálogo completo
      </Link>
    </animated.div>
  );
}

function HomePage({ products, getLatests }) {
  useEffect(() => {
    getLatests();
  }, []);

  return (
    <Container fluid>
      <Row className={s["main-section"] + " " + s["section"]}>
        <div className={s["cover-main"]}>
          <img src="https://images.hdqwalls.com/wallpapers/thanos-vs-kratos-jt.jpg" />
        </div>
        <div className={s["main-inside"]}>
          <ShowAppName />
          <TextIntro />
          <ExploreButton />
        </div>
      </Row>

      <Gallery products={products} />
    </Container>
  );
}

function Gallery({ products }) {
  const handleOnDragStart = (e) => e.preventDefault();

  useEffect(() => {}, []);

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
          <Button variant="light">
            <CgShoppingCart />
          </Button>
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
        <p className="mb-0">
          <h2 className={s["kewx"]}>Explorá</h2>
        </p>
        <p className={s.kewx}>Mirá nuestro catálogo completo!</p>
        <Link
          to="/catalogo"
          className={s["kewx"] + " px-5 btn btn-outline-danger mb-4 btn-lg"}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLatests: () => dispatch(getLatests()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
