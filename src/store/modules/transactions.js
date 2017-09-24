import axios from 'axios';

export const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';
export const SET_TRANSACTIONS = 'transactions/SET_TRANSACTIONS';
export const UPDATE_TRANSACTION_AMZN = 'transaction/UPDATE_TRANSACTION_AMZN';
export const PROMOTE_CART = 'transaction/PROMOTE_CART';

// sync with user.activeCart
const initialState = {
  transactions: [],
  pendingTransaction: null, 
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case ADD_TRANSACTION: 
    return {
      ...state,
      transactions: state.transactions.concat(Array.isArray(payload) ? payload : [payload])
    };
  case SET_TRANSACTIONS:
    return {
      ...state, 
      transactions: payload
    };
  case UPDATE_TRANSACTION_AMZN:
    const activeTransaction = {...state.pendingTransaction, ...payload};
    return {
      ...state,
      pendingTransaction: activeTransaction
    };
  case PROMOTE_CART:
    return {
      ...state,
      pendingTransaction: payload
    };
  default: return state;
  }
};

export const addTransaction = payload => (
  {
    type: ADD_TRANSACTION,
    payload
  }
);

export const setTransactions = payload => {
  return dispatch => {
    axios.get('/api/transactions')
      .then(transactions => {
        dispatch({
          type: SET_TRANSACTIONS,
          payload: transactions.data
        });
      })
      .catch(e => console.log('error getting transactions: ', e));
  };
};

/**
 * On success, move current cart to pendingTransaction.
 * 
 * @param {object} payload 
 */
export const checkout = () => {
  return (dispatch, getState) => {
    const {app, products} = getState();
    if (app.user) {
      axios.post(`/api/users/${app.user.id}/cart`, {
        cart: products.cart, 
        quantities: products.quantities
      })
        .then(res => {
          dispatch(
            {
              type: PROMOTE_CART,
              payload: res.data
            }
          );
        })
        .catch(err => console.log('error in the checkout: ', err));
    }
  };
};

/**
 * @param {number} payload 
 */
export const handleAmazonCart = (payload) => {
  return (dispatch, getState) => {
    const {transactions} = getState();
    axios.post(`/api/transactions/${transactions.pendingTransaction.id}/amzn`)
      .then(response => {
        dispatch(
          {
            type: UPDATE_TRANSACTION_AMZN,
            payload: response.data
          }
        );
      })
      .catch(err => console.log('error in the checkout: ', err));
  };
};