import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import routes from '../routes.js';


import Home from './Home.jsx';
import Product from './Product.jsx';
import Cart from './Cart.jsx';
import Profile from './Profile.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Receipt from './Receipt.jsx';

import Nav from '../components/Nav.js';


import { matchRoutes, renderRoutes } from 'react-router-config';

import { setHello, appTypes } from '../store/modules/app.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  static fetchData(store) {
    return store;
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme({
        theme: lightBaseTheme,
        AppBar: {
          position: 'relative',
          padding: 0,
          left: 0
        }
      })}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;