import React, { useState, useEffect, setState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import s from "../styles/navbar.module.scss";
import { Navbar as Navb, Nav, Container } from "react-bootstrap";
import config from "../config";
import { useSpring, animated } from "react-spring";

const APP_NAME = config.app.name;

export default function Navbar() {
  const location = useLocation();
  const [state, setState] = useState({
    navbarBg: "",
    navbarExpanded: false,
  });

  const handleScroll = (e) => {
    if (
      (document.documentElement.scrollTop >= 50 && state.navbarBg === "") ||
      state.navbarExpanded
    ) {
      setState({
        ...state,
        navbarBg: "navbar-colorated",
      });
    }
    if (
      document.documentElement.scrollTop < 50 &&
      state.navbarBg !== "" &&
      !state.navbarExpanded
    ) {
      setState({
        ...state,
        navbarBg: "",
      });
    }
  };

  const handleToggle = () => {
    if (state.navbarExpanded) {
      if (document.documentElement.scrollTop >= 50) {
        setState({
          ...state,
          navbarExpanded: false,
        });
      } else {
        setState({
          ...state,
          navbarExpanded: false,
          navbarBg: "",
        });
      }
    } else {
      setState({
        ...state,
        navbarExpanded: true,
        navbarBg: "navbar-colorated",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Navb
      expand="md"
      variant="dark"
      bg=""
      className={
        "mb-4 " +
        (location.pathname === "/"
          ? s.navbar + " fixed-top"
          : "sticky-top " + s["navbar-nohome"]) +
        " " +
        s[state.navbarBg]
      }
    >
      <Container>
        {console.log(document.documentElement.scrollTop)}
        <Navb.Brand href="/">{APP_NAME}</Navb.Brand>
        <Navb.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
        <Navb.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink className="nav-link" activeClassName="active" exact to="/">
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
  );
}
