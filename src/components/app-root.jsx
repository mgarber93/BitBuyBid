import React from 'react';
import Search from '../components/Search.jsx';
import CartWidget from '../components/CartWidget.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { renderRoutes } from 'react-router-config';

import Product from '../views/Product.jsx';
import Cart from '../views/Cart.jsx';
import Profile from '../views/Profile.jsx';
import Login from '../views/Login.jsx';
import Signup from '../views/Signup.jsx';
import Receipt from '../views/Receipt.jsx';
import Home from '../views/Home.jsx';
import Logout from '../views/Logout.jsx';

import Nav from './Nav.js';

/*
  the default route should always be last, as the interpreter
  will render the first route that returns positive in the switch 
  block as matching the path endpoint. therefor, the '/' will render
  no matter what the chartacters after the URI are, serving as a 
  kind of catch-all. 
*/
export default ({route}) => (
  <div>
    <Nav />
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/logout'> 
        <Logout />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route path='/receipt'> 
        <Receipt />
      </Route>
      <Route path='/cart'>
        <Cart />
      </Route>
      <Route path='/product'> 
        <Product />
      </Route>
      <Route path='/profile'> 
        <Profile />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  </div>
);
