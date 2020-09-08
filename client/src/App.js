import React from 'react';
import './styles/ecommerce.scss';
import {BrowserRouter, Route} from 'react-router-dom'
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';
import ProductsCRUD from './components/CRUD/formCRUD';
import AddCategories from './components/AddCategory';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Route path="/productos/:id" component={Product} />
          <Route path="/catalogo" component={Catalogue} />    
        </BrowserRouter>
        <BrowserRouter basename="/admin">
          <Route path="/productos" component={ProductsCRUD} />
          <Route path="/categorias" component={AddCategories} />
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
