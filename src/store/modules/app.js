import axios from 'axios';
import { push } from 'react-router-redux';

export const appTypes = {
  SET_USER: 'app/SET_USER',
  DISCARD_CART: 'app/DISCARD_CART'
};

const initialState = {
  user: null,
  transactions: null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case appTypes.SET_USER: 
    return {
      ...state, 
      user: payload
    };
  case appTypes.DISCARD_CART: 
    return {
      ...state, 
      user: {...state.user, 'active_cart': null} 
    };
  default: return state;
  }
};


export const setUser = payload => {
  return {
    type: appTypes.SET_USER,
    payload
  };
};

export const handleLogin = (user) => {
  return (dispatch) => {
    axios.post('/auth/login', user)
      .then((results) => {
        dispatch({
          type: appTypes.SET_USER,
          payload: results.data
        });
      })
      .catch((err) => {
        alert('Incorrect user information or user does not exist');
        console.log(err);
      });
  };
};

export const handleSignup = (user) => {
  return (dispatch) => {
    axios.post('/auth/signup', user)
      .then(({data}) => {
        if (data && data.first) {
          dispatch(
            {
              type: appTypes.SET_USER,
              payload: data 
            }
          );
          alert(`you are logged in as ${data.first}!`);
        } else {
          alert('signup failed!');
        }
      })
      .catch(console.error);
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    axios.get('/auth/logout')
      .then(res => {
        dispatch({
          type: appTypes.SET_USER,
          payload: null
        });
      });
  };
};

export const discardCart = () => {
  return (dispatch, getState) => {
    axios.delete(`/api/users/${getState().app.user.id}/cart`)
      .then(res => {
        console.log(res);
        dispatch({
          type: appTypes.DISCARD_CART,
          payload: null
        });
      })
      .catch(console.error);
  };
};
