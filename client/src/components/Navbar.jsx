import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../styles/navbar.module.scss';

export default function Navbar() {
    return(
        <nav className={style.navbar}>
            <div className={style.logo}>
                <NavLink exact to='/'>
                    <img src='/images/logo.svg' alt=""/>
                </NavLink>
            </div>
            <ul>
                <li>
                    <NavLink activeClassName={style.active} exact to='/'>
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active} to='/catalogo'>
                        Catálogo
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active} to='/admin/productos'>
                        Administrar productos
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName={style.active} to='/admin/categorias'>
                        Administrar categorías
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}