import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { 
  createCart, 
  addToCart, 
  removeFromCart
} from '../store/modules/products.js';
import axios from 'axios';

class Stripe extends Component {
  constructor(props) {
    super(props);

    this.calculateTotal = this.calculateTotal.bind(this);
    
    this.onToken = (token) => {
      axios.post(`/api/transactions/${this.props.pendingTransaction.id}/stripe`, {
        client_ip: token.client_ip,
        created: token.created,
        email: token.email,
        payment: token.type
      });
    };
  }

  calculateTotal() {
    let total = this.props.cart.reduce((acc, product) => {
      return product.price ? 
        acc += product.price * this.props.quantities[product.prod_id] : 
        acc;
    }, 0) * 100;
    return total.toFixed(2);
  }

  render() {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_5PUQTJpGR4ExQgfjhdOz2cw0"
          bitcoin={true}
          description="BitBuyz"
          image="https://i.imgur.com/wLGvMlJ.jpg"
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          amount={Number(this.calculateTotal())}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => 
  ({
    cart: state.products.cart,
    quantities: state.products.quantities,
    pendingTransaction: state.transactions.pendingTransaction
  });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({createCart, addToCart, removeFromCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Stripe);