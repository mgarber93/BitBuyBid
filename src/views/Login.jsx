import React from 'react';
import {handleLogin} from '../store/modules/app.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
  }

  static fetchData(store) {
    return store;
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePassChange(e) {
    this.setState({password: e.target.value});
  }

  render() {
    if (this.props.user) {
      return (<Route render={props => (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )} />);
    }
    return (
      <div className='login center'>
        <h1>Login</h1>
        <TextField 
          hintText='email' 
          floatingLabelText='Email' 
          type='email' 
          value={this.state.email} 
          onChange={this.handleEmailChange} 
        /> 
        <br/>
        <TextField 
          onKeyPress={this.handlePassChange} 
          floatingLabelText='Password' 
          type='password' 
          value={this.state.password} 
          onChange={this.handlePassChange} 
        />
        <br/>
        <RaisedButton 
          className='btn' 
          onClick={() => this.props.handleLogin({email: this.state.email, password: this.state.password})}
        >Login
        </RaisedButton>
        <FlatButton className='btn' href='/signup'>Sign Up</FlatButton><br/>
      </div>
    );
  }

}

const mapStateToProps = ({app}) => {
  return {
    user: app.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogin
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);