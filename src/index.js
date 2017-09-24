import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index.js';
import App from './views/app.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const store = configureStore(window.__PRELOADED_STATE__, window);

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import routes from './routes.js';

import { matchRoutes, renderRoutes } from 'react-router-config';

/**
 * Render react to the dom from the client side
 */
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme({
      theme: lightBaseTheme,
      AppBar: {
        position: 'relative',
        padding: 0,
        left: 0
      },
      userAgent: window.USER
    })}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('root'));
