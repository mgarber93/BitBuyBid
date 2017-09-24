import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Stripe from '../components/Stripe.jsx';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { discardCart } from '../store/modules/app';
import { handleAmazonCart } from '../store/modules/transactions';

class Receipt extends Component {
  constructor(props) {
    super(props);
    this.handleBitcoinBuy = this.handleBitcoinBuy.bind(this);
    this.amount = this.calculateLeftOver();
  }

  calculateLeftOver() {
    const total = (this.props.cart.length !== 0 ? this.props.cart : this.props.pendingTransaction ? this.props.pendingTransaction.cart : []).reduce((acc, curr) => 
      acc + (Number(curr.price)) * this.props.quantities[curr.prod_id]
      , 0).toFixed(2);
    return (Math.ceil(total) - total).toFixed(2);
  }

  handleBitcoinBuy(amount) {
    alert(`you have purchased %${(100 * amount / 4288.99).toFixed(8)} of a single bitcoin`);
  }

  render() {
    return (
      <div>
        {
          <Switch>
            <Route exact path='/receipt/amazon'>
              <div>
                <h2>Thank you!</h2>
                <RaisedButton
                  onClick={() => this.handleBitcoinBuy(this.amount)}
                  label={`Get ${this.amount} worth of Bitcoins`}
                />
                {this.props.pendingTransaction['amzn_purchase_url'] && <a href={this.props.pendingTransaction['amzn_purchase_url']}>YOUR CART</a>}
                {this.props.pendingTransaction && this.props.pendingTransaction['amzn_purchase_url'] ? 
                  <RaisedButton 
                    onClick={() => this.props.discardCart()}
                    label="Discard Cart"
                  /> : 
                  <RaisedButton 
                    onClick={() => this.props.handleAmazonCart()}
                    label="Create Amazon cart"
                  />}
              </div>
            </Route>
            <Route exact path='/receipt/stripe'>
              <div>
                <script src="https://checkout.stripe.com/checkout.js"></script>
                <Stripe />
              </div>
            </Route>
          </Switch>
        }
      </div>
    );
  }
}

const mapStateToProps = ({products, transactions, app}) => ({
  user: app.user,
  cart: products.cart,
  pendingTransaction: transactions.pendingTransaction,
  quantities: products.quantities
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    handleAmazonCart,
    discardCart
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
