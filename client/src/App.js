import React from 'react';
import './styles/ecommerce.scss'
import {Router, BrowserRouter, Route} from 'react-router-dom'
import Product from './components/Product/Product';

function App() {
  return (
    <React.Fragment>
        <BrowserRouter>
          <Route path="/products/:id" component={Product} />
        </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
