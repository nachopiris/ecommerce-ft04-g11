import React from 'react';
import './styles/ecommerce.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';
import AdminProducts from './components/AdminProducts/AdminProducts';
import UserRegister from './components/UserRegister';
import AddCategories from './components/AddCategory';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Orders from './components/Orders'
import Cart from './components/Cart/Cart'
import Error404 from './components/Error404'

function App() {
    return (
        <React.Fragment>
            <Route path="/" component={Navbar} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/registrarse" component={UserRegister} />
                <Route exact path="/productos/:id" component={Product} />
                <Route exact path="/catalogo" component={Catalogue} />
                <Route exact path="/carrito" component={Cart} />

                <Route exact path="/admin/productos" component={AdminProducts} />
                <Route exact path="/admin/categorias" component={AddCategories} />
                <Route exact path="/admin/ordenes" component={Orders} />


                <Route path="*" component={Error404} />


            </Switch>
        </React.Fragment>
    );
}

export default App;
