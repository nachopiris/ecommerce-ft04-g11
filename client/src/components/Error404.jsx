import React from 'react'
import { Container } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom'
import style from '../styles/error404.module.scss'

export default function Error404() {
    const location = useLocation();
    return (
        location.pathname.split('/')[1] !== "admin" ?
            <Container className="text-center">
                <h1 className="display-2">Error 404</h1>
                <span className="text-white-50">Qué extraño, parece que no hay nada acá. Intenta seguir navegando desde el menú o regresa al catálogo.</span><br /><br />
                <Link className={style.btn} exact to="/catalogo">Volver al catálogo</Link>
            </Container> :
            <Container className="text-center">
                <h1 className="display-2">Error 404</h1>
                <span className="text-white-50">La dirección a la que intentas acceder no corresponde a un recurso administrativo. <br />
                Si crees que esto es un error, contacta con el equipo técnico.</span><br /><br />
                <Link className={style.btn} exact to="/admin">Volver al panel</Link>
            </Container>
    )
}