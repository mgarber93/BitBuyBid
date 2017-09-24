import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart,
} from '../store/modules/products.js';
import {checkout} from '../store/modules/transactions.js';
import Listing from '../components/Listing.jsx';
import Receipt from '../views/Receipt.jsx';
import CartItem from '../components/CartItem.jsx';
import Subtotal from '../components/Subtotal.jsx';
import Stripe from '../components/Stripe.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter> 
        <div>
          {(this.props.cart.length !== 0 ? this.props.cart : this.props.pendingTransaction && this.props.pendingTransaction.cart ? this.props.pendingTransaction.cart : []).map((item, i) => {
            return <CartItem key={i} item={item} />;
          })}
          <div>
            Subtotal: <Subtotal />
          </div>
          <Switch>
            <Route exact path='/cart/confirm'>
              <div>
                <Link to='/receipt/amazon'><FlatButton label="Amazon Checkout"/></Link>
                <Link to='/receipt/stripe'><FlatButton label="Stripe Checkout"/></Link>
                <Link to='/cart'><FlatButton label="Abort"/></Link>
              </div>
            </Route>
            <Route path='/cart'>
              {this.props.cart.length !== 0 && <Link to='/cart/confirm'><FlatButton label="Checkout!" onClick={() => this.props.checkout()}/></Link>}
            </Route>
            <Route path='/receipt'>
              <Receipt/>
            </Route>
          </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => 
  ({
    cart: state.products.cart,
    quantities: state.products.quantities,
    pendingTransaction: state.transactions.pendingTransaction,
  });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCart, addToCart, removeFromCart, checkout}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);