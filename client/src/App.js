import React from 'react';
import './styles/ecommerce.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';
import ProductsCRUD from './components/CRUD/formCRUD';
import AddCategories from './components/AddCategory';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Orders from './components/Orders'

function App() {
    return (
        <React.Fragment>
            <Route path="/" component={Navbar} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/productos/:id" component={Product} />
                <Route exact path="/catalogo" component={Catalogue} />

                <Route exact path="/admin/productos" component={ProductsCRUD} />
                <Route exact path="/admin/categorias" component={AddCategories} />
                <Route exact path="/admin/ordenes" component={Orders} />
                <Route path="/admin/*">
                    <div>
                        <h1>404</h1>
                        <p>Recursos administrativos no encontrados</p>
                    </div>
                </Route>

                <Route path="*">
                    <h1>404</h1>
                    <p>Página no encontrada</p>
                </Route>


            </Switch>
        </React.Fragment>
    );
}

export default App;
