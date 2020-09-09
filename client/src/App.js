import React from 'react';
import './styles/ecommerce.scss';
import {BrowserRouter, Route} from 'react-router-dom'
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';
import ProductsCRUD from './components/CRUD/formCRUD';
import AddCategories from './components/AddCategory';
import Navbar from './components/Navbar';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Route path="/" component={Navbar} />
          <Route exact path="/" />
          <Route exact path="/productos/:id" component={Product} />
          <Route exact path="/catalogo" component={Catalogue} />
          <Route exact path="/admin/productos" component={ProductsCRUD} />
          <Route exact path="/admin/categorias" component={AddCategories} />
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
