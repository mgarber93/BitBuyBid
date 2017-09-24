import axios from 'axios';
export const SET_BTC_EXCHANGE = 'exchange/SET_BTC_EXCHANGE';

// inject this value from server
const initialState = {
  btcExchange: undefined,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  case SET_BTC_EXCHANGE:
    return {
      ...state,
      btcExchange: payload
    };
  default: return state;
  }
};

export const setExchange = (payload) => {
  return {
    type: SET_BTC_EXCHANGE,
    payload
  };
};

export const bitExchange = () => {
  return (dispatch) => {
    axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
      .then((data) => {
        dispatch({
          type: SET_BTC_EXCHANGE,
          payload: data.data.amount,
        });    
      });
  };
  
};