import React from 'react';
import './styles/ecommerce.scss';
import {Router, BrowserRouter, Route} from 'react-router-dom'
import Product from './components/Product/Product';
import Catalogue from './components/Catalogue';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Route path="/productos/:id" component={Product} />
          <Route path="/catalogo" component={Catalogue} />
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
