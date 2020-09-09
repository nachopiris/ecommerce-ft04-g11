import React from 'react';
import './styles/ecommerce.scss';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';
import ProductsCRUD from './components/CRUD/formCRUD';
import AddCategories from './components/AddCategory';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <React.Fragment>
        <Route path="/" component={Navbar} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/productos/:id" component={Product} />
          <Route exact path="/catalogo" component={Catalogue} />    

          <Route path="/admin">
            <BrowserRouter basename="/admin">
              <Switch>
                <Route exact path="/productos" component={ProductsCRUD} />
                <Route exact path="/categorias" component={AddCategories} />
                <Route path="*">
                  <div>
                    <h1>404</h1>
                    <p>Recursos administrativos no encontrados</p>
                  </div>
                </Route>
              </Switch>
            </BrowserRouter>
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
