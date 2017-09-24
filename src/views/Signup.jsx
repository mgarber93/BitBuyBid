import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router-dom';
import {handleSignup} from '../store/modules/app.js';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      first: '',
      last: '',
      username: ''
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleFirstChange = this.handleFirstChange.bind(this);
    this.handleLastChange = this.handleLastChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePassChange(e) {
    this.setState({password: e.target.value});
  }
  handleFirstChange(e) {
    this.setState({first: e.target.value});
  }
  handleLastChange(e) {
    this.setState({last: e.target.value});
  }
  handleUserChange(e) {
    this.setState({username: e.target.value});
  }

  submitHandler() {
    var fieldsValid = this.state.email && this.state.first && 
      this.state.last && this.state.password && this.state.username;
    if (fieldsValid) {
      this.props.handleSignup(this.state);
    } else {
      alert('All fields must be filled');
    }
  }

  render() {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <h1><span className="fa fa-sign-in"></span>Sign up</h1>

        <div className="form-group">
          <label>Username</label>
          <input onChange={this.handleUserChange} type="text" className="form-control" name="username" />
        </div>

        <div className="form-group">
          <label>First</label>
          <input onChange={this.handleFirstChange} type="text" className="form-control" name="first" />
        </div>

        <div className="form-group">
          <label>Last</label>
          <input onChange={this.handleLastChange} type="text" className="form-control" name="last" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input onChange={this.handleEmailChange} type="text" className="form-control" name="email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input onChange={this.handlePassChange} type="password" className="form-control" name="password" />
        </div>

        <button onClick={this.submitHandler} className="btn btn-warning btn-lg">Sign up</button>

        <p>Already have an account?</p> 
        <Link to='/login'>Login Page</ Link> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // term: state.search.term
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleSignup
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);