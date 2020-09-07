import React from 'react';
import './styles/ecommerce.scss';
import {BrowserRouter, Route} from 'react-router-dom'
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';
import ProductsCRUD from './components/CRUD/formCRUD';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Route path="/productos/:id" component={Product} />
          <Route path="/catalogo" component={Catalogue} />
        </BrowserRouter>
        <BrowserRouter basename="/admin">
          <Route path="/productos" component={ProductsCRUD} />
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
