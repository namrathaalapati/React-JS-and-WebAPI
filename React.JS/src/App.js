import React from 'react';
import './App.css';

import Home from './components/Home';
import Order from './components/Order';
import Customer from './components/Customer';
import Navigation from './components/Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 flex justify-content-center">
          React JS with Web Api Demo
        </h3>
        <h5>Medical Management Portal</h5>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path ='/Order' component={Order} />
          <Route path='/Customer' component={Customer} />
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
