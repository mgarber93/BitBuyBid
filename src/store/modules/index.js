import {combineReducers} from 'redux';
import app from './app';
import products from './products';
import search from './search';
import exchange from './exchange';
import transactions from './transactions';

export default combineReducers(
  {
    app, 
    search, 
    products, 
    exchange, 
    transactions
  }
);