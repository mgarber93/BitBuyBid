import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleLogout } from '../store/modules/app.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const Logout = ({user, handleLogout, ...rest}) => (
  <div>
    <Route {...rest} render={props => (
      user ? (
        <FlatButton onClick={() => handleLogout()} label="Logout" />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )} />
  </div>
);

const mapStateToProps = ({app}) => {
  return {
    user: app.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogout
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);