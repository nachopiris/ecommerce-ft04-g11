import AdminProducts from './components/AdminProducts/AdminProducts';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import UserRegister from './components/UserRegister';
import AddCategories from './components/AddCategory';
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';
import HomePage from './components/HomePage';
import Error404 from './components/Error404'
import Cart from './components/Cart/Cart'
import Navbar from './components/Navbar';
import Orders from './components/Orders'
import Login from './components/Login';
import Users from './components/Users'
import './styles/ecommerce.scss';
import React from 'react';

function App() {
    return (
        <React.Fragment>
            <Route path="/" component={Navbar} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/registrarse" component={UserRegister} />
                <Route exact path="/ingresar" component={Login} />
                <Route exact path="/productos/:id" component={Product} />
                <Route exact path="/catalogo" component={Catalogue} />
                <Route exact path="/carrito" component={Cart} />

                <Route exact path="/admin/usuarios" component={Users}></Route>
                <Route exact path="/admin/productos" component={AdminProducts} />
                <Route exact path="/admin/categorias" component={AddCategories} />
                <Route exact path="/admin/ordenes" component={Orders} />


                <Route path="*" component={Error404} />


            </Switch>
        </React.Fragment>
    );
}

export default App;
