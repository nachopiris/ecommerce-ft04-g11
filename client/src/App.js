import AdminProducts from "./components/AdminProducts/AdminProducts";
import { Switch, Route } from "react-router-dom";
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
import Users from "./components/Users/Users";
import Account from "./components/Account";
import "./styles/ecommerce.scss";
import React from "react";
import LogOutRoute from './components/LogOutRoute';
import LogInRoute from './components/LogInRoute';
import AdminRoute from './components/AdminRoute';
import PasswordReset from "./components/PasswordReset";
import Checkout from './components/Checkout';
import UserOverview from './components/Users/UserOverview';
import ErrorAlert from './components/ErrorAlert';
import GlobalGetters from './components/GlobalGetters';
import Success from './components/Success';
import Failure from './components/Failure'

function App() {
    return (
        <React.Fragment>
            <ErrorAlert/>
            <GlobalGetters/>
            <Route path="/" component={Navbar} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <LogOutRoute exact path="/registrarse" component={UserRegister} />
                <LogOutRoute exact path="/ingresar" component={Login} />
                <LogOutRoute exact path="/olvide-mi-clave" component={PasswordReset} />
                <Route exact path="/productos/:id" component={Product} />
                <Route exact path="/catalogo" component={Catalogue} />
                <Route exact path="/carrito" component={Cart} />
                <Route exact path="/success" component={Success} />
                <Route exact path="/failure" component={Failure} />
                <LogInRoute exact path="/cuenta" component={Account} />
                <LogInRoute exact path="/comprando" component={Checkout} />

                <AdminRoute exact path="/admin/usuarios" component={Users} />
                <AdminRoute
                    exact
                    path="/admin/productos"
                    component={AdminProducts}
                />
                <AdminRoute exact path="/admin/usuario/:id" component={UserOverview} />
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
