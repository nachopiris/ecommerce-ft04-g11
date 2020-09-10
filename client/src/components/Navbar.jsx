import React from "react";
import { NavLink } from "react-router-dom";
import style from "../styles/navbar.module.scss";
import { Navbar as Navb, Nav, Container } from "react-bootstrap";
import config from "../config";
import { useSpring, animated } from "react-spring";

const APP_NAME = config.app.name;

export default function Navbar() {
  const props = useSpring({
    from: {
      opacity: 0,
    },
    immediate: false,
    to: {
      opacity: 1,
    },
    y: 400,
    onFrame: (props) => {
      window.scroll(200, props.y);
    },
    config: config.slow,
  });

  return (
    <animated.div style={props}>
      <Navb expand="md" bg="transparent" variant="dark" fixed="top">
        <Container>
          <Navb.Brand href="#home">{APP_NAME}</Navb.Brand>
          <Navb.Toggle aria-controls="basic-navbar-nav" />
          <Navb.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavLink
                className="nav-link"
                activeClassName="active"
                exact
                to="/"
              >
                Inicio
              </NavLink>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/catalogo"
              >
                Catálogo
              </NavLink>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/admin/productos"
              >
                Administrar productos
              </NavLink>
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/admin/categorias"
              >
                Administrar categorías
              </NavLink>
            </Nav>
          </Navb.Collapse>
        </Container>
      </Navb>

      {/* <nav className={style.navbar}>
        <div className={style.logo}>
          <NavLink
            activeClassName={style.active}
            style={{ background: "none" }}
            exact
            to="/"
          >
            <img src="/images/logo.svg" alt="" />
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink activeClassName={style.active} exact to="/">
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={style.active} to="/catalogo">
              Catálogo
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={style.active} to="/admin/productos">
              Administrar productos
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={style.active} to="/admin/categorias">
              Administrar categorías
            </NavLink>
          </li>
        </ul>
      </nav> */}
    </animated.div>
  );
}
