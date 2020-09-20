import React, { useState, useEffect, setState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import s from "../styles/navbar.module.scss";
import { Navbar as Navb, Nav, Container } from "react-bootstrap";
import config from "../config";
import { useSpring, animated } from "react-spring";
import { connect } from 'react-redux';

const APP_NAME = config.app.name;

export function Navbar({ auth }) {
    const location = useLocation();
    const { user, token } = auth;
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
                <Link to="/" className="navbar-brand">{APP_NAME}</Link>
                <Navb.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
                <Navb.Collapse id="basic-navbar-nav">
                    {location.pathname.split('/')[1] === "admin" && user.role === 'admin' ? (
                        <Nav className="ml-auto">
                            <NavLink className="nav-link" activeClassName="active" to="/admin/usuarios">
                                Usuarios
                                </NavLink>
                            <NavLink className="nav-link" activeClassName="active" to="/admin/ordenes">
                                Órdenes
                            </NavLink>
                            <NavLink className="nav-link" activeClassName="active" to="/admin/productos">
                                Productos
                            </NavLink>
                            <NavLink className="nav-link" activeClassName="active" to="/admin/categorias">
                                Categorías
                            </NavLink>
                            <NavLink className="nav-link" exact to="/">
                                Volver al sitio
                            </NavLink>
                        </Nav>) : token ? (
                            <Nav className="ml-auto">
                                <NavLink className="nav-link" activeClassName="active" exact to="/">
                                    Inicio
                                </NavLink>
                                <NavLink className="nav-link" activeClassName="active" exact to="/cuenta">
                                    Cuenta
                                </NavLink>
                                <NavLink className="nav-link" activeClassName="active" to="/catalogo">
                                    Catálogo
                                </NavLink>
                                <NavLink className="nav-link" activeClassName="active" exact to="/carrito">
                                    Carrito
                                </NavLink>
                                { user.role === 'admin' &&
                                    <NavLink className="btn btn-dark" to="/admin">
                                        Administración
                            </NavLink>
                                }
                            </Nav>
                        ) :
                            (
                                <Nav className="ml-auto">
                                    <NavLink className="nav-link" activeClassName="active" exact to="/">
                                        Inicio
                                </NavLink>
                                    <NavLink className="nav-link" activeClassName="active" exact to="/registrarse">
                                        Registrarse
                                </NavLink>
                                    <NavLink className="nav-link" activeClassName="active" exact to="/ingresar">
                                        Ingresar
                                </NavLink>
                                    <NavLink className="nav-link" activeClassName="active" to="/catalogo">
                                        Catálogo
                                </NavLink>
                                    <NavLink className="nav-link" activeClassName="active" exact to="/carrito">
                                        Carrito
                                </NavLink>
                                </Nav>
                            )}
                </Navb.Collapse>
            </Container >
        </Navb >
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);