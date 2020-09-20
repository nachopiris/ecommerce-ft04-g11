import AdminProducts from "./components/AdminProducts/AdminProducts";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserRegister from "./components/UserRegister";
import AddCategories from "./components/AddCategory";
import Product from "./components/Product/Product";
import Catalogue from "./components/Catalogue";
import HomePage from "./components/HomePage";
import Error404 from "./components/Error404";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar";
import Orders from "./components/Orders";
import Login from "./components/Login";
import Users from "./components/Users";
import Account from "./components/Account";
import "./styles/ecommerce.scss";
import React from "react";
import LogOutRoute from './components/LogOutRoute';
import LogInRoute from './components/LogInRoute';
import AdminRoute from './components/AdminRoute';
import PasswordReset from "./components/PasswordReset";


function App() {
    return (
        <React.Fragment>
            <Route path="/" component={Navbar} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <LogOutRoute exact path="/registrarse" component={UserRegister} />
                <LogOutRoute exact path="/ingresar" component={Login} />
                <LogOutRoute exact path="/olvide-mi-clave" component={PasswordReset} />
                <Route exact path="/productos/:id" component={Product} />
                <Route exact path="/catalogo" component={Catalogue} />
                <Route exact path="/carrito" component={Cart} />
                <LogInRoute exact path="/cuenta" component={Account} />

                <AdminRoute exact path="/admin/usuarios" component={Users} />
                <AdminRoute
                    exact
                    path="/admin/productos"
                    component={AdminProducts}
                />
                <AdminRoute
                    exact
                    path="/admin/categorias"
                    component={AddCategories}
                />
                <AdminRoute exact path="/admin/ordenes" component={Orders} />

                <Route path="*" component={Error404} />
            </Switch>
        </React.Fragment >
    );
}

export default App;
