import React from 'react';
import { Route } from 'react-router-dom';
import './styles/ecommerce.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

import Catalogue from './components/Catalogue';

function App() {
  return (
    <div className="container">
      <Route path="/catalogo" component={Catalogue} />
    </div>
  );
}

export default App;
