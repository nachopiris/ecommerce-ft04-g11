import React from 'react'
import { Nav, Col } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import '../styles/adminNav.css'
import config from '../config'

const APP_NAME = config.app.name;

export default function AdminNav() {
    return (
        <Nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-left">
            <Link to="/" className="navbar-brand">{APP_NAME}</Link>
            <Col className="collapse navbar-collapse navbar-nav flex-column ">
                <NavLink className="nav-link" activeClassName="active" to="/admin/usuarios">
                    Usuarios
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/admin/productos">
                    Productos
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/admin/categorias">
                    Categorías
                </NavLink>
                <NavLink className="nav-link" activeClassName="active" to="/admin/ordenes">
                    Órdenes
                </NavLink>
            </Col>
        </Nav>
    )
}