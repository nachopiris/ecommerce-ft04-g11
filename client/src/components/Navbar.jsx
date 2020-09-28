import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import s from "../styles/navbar.module.scss";
import { Navbar as Navb, Nav, Container } from "react-bootstrap";
import config from "../config";
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { FaShoppingCart } from 'react-icons/fa'
import { MdAccountCircle, MdAssignmentInd } from 'react-icons/md'
import { RiLogoutBoxRLine, RiLoginBoxLine } from 'react-icons/ri'
import { ImHome3 } from 'react-icons/im';
import { CgNotes } from 'react-icons/cg';
import { IoIosMenu } from 'react-icons/io';

const APP_NAME = config.app.name;

export function Navbar({ auth, logout,guestCart, userCart }) {
    const location = useLocation();
    const { user, token } = auth;

    const logOut = () => {
        logout(token).then(() => {
            localStorage.clear();
            window.location.reload();
        });
    }

    const [state, setState] = useState({
        navbarBg: "",
        navbarExpanded: false,
        countCart: 0
    });

    

    useEffect(()=>{
        const hideCollapse = () => {
            setState(state => {
                return {
                    ...state,
                    navbarExpanded: false
                }
            });
        }

        let elements = document.getElementsByClassName('nav-link');
        
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click",hideCollapse);
        }
        for (let i = 0; i < elements.length; i++) {
            elements[i].removeEventListener("click",hideCollapse);
        }

    },[auth]);

    

    useEffect(() => {
        if(!auth.token){
            setState(state => {
                return {
                    ...state,
                    countCart: guestCart.length
                }
            })
        }else{
            setState(state => {
                return {
                    ...state,
                    countCart: userCart.products.length
                }
            })
        }

        
    },[guestCart, userCart, auth, state.navbarExpanded]);

    const handleScroll = (e) => {
        if (
            (document.documentElement.scrollTop >= 50 && state.navbarBg === "") ||
            state.navbarExpanded
        ) {
            setState({
                ...state,
                navbarBg: "navbar-colorated"
            });
        }
        if (
            document.documentElement.scrollTop < 50 &&
            state.navbarBg !== "" &&
            !state.navbarExpanded
        ) {
            setState({
                ...state,
                navbarBg: ""
            });
        }
    };

    const handleToggle = () => {
        if (state.navbarExpanded) {
            if (document.documentElement.scrollTop >= 50) {
                setState({
                    ...state,
                    navbarExpanded: false
                });
            } else {
                setState({
                    ...state,
                    navbarExpanded: false,
                    navbarBg: ""
                });
            }
        } else {
            setState({
                ...state,
                navbarExpanded: true,
                navbarBg: "navbar-colorated"
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
            expanded={state.navbarExpanded}
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
                <Link to="/" className="navbar-brand">{APP_NAME}</Link>
                <Navb.Toggle id="toggle-nav" onClick={handleToggle} className="position-relative" aria-controls="basic-navbar-nav">
                <IoIosMenu />
                <div className={'toggle-mark badge badge-danger' + (state.countCart < 1 ? ' d-none' : '')}> </div>
                </Navb.Toggle>
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
                        </Nav>) : (
                            <React.Fragment>
                                <Nav className="ml-auto">
                                    {user.role === 'admin' &&
                                        <NavLink className="btn btn-dark" to="/admin">
                                            Administración
                    </NavLink>}
                                </Nav>
                                <Nav className="ml-auto">
                                    <NavLink className="nav-link" activeClassName="active" exact to="/">
                                        <ImHome3 /> Inicio
                                </NavLink>
                                    <NavLink className="nav-link" activeClassName="active" to="/catalogo">
                                        <CgNotes /> Catálogo
                                </NavLink>
                                    <NavLink className={'nav-link' +(state.countCart > 0 ? ' text-danger' : '')} activeClassName="active" exact to="/carrito">
                                        <FaShoppingCart /> Carrito
                                        <span className={'badge badge-danger' + (state.countCart < 1 ? ' d-none' : '')}>{state.countCart}</span>
                                    </NavLink>
                                    {token ?
                                        <React.Fragment>
                                            <NavLink className="nav-link" activeClassName="active" exact to="/cuenta">
                                                <MdAccountCircle size={20} /> Mi Cuenta
                                            </NavLink>
                                            <Link onClick={() => logOut()} className="nav-link" to="/#">
                                                <RiLogoutBoxRLine /> Salir
                                            </Link>
                                        </React.Fragment> :
                                        < React.Fragment >
                                            <NavLink className="nav-link" activeClassName="active" exact to="/ingresar">
                                                <RiLoginBoxLine /> Ingresar
                                </NavLink>
                                            <NavLink className="nav-link" activeClassName="active" exact to="/registrarse">
                                                <MdAssignmentInd /> Registrarse
                                </NavLink>
                                        </React.Fragment>

                                    }
                                </Nav>
                            </React.Fragment>
                        )}
                </Navb.Collapse>
            </Container >
        </Navb >
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer,
        guestCart: state.guestReducer.cart,
        userCart: state.usersReducer.userCart
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: token => dispatch(logout(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);