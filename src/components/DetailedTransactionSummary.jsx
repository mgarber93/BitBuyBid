import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import { Link } from 'react-router-dom';

class DetailedTransactionSummary extends Component {
  constructor(props) {
    super(props);
    this.total = this.calculateTotal(props.transaction.cart);
  }

  calculateTotal(cart) {
    return cart.reduce((acc, product) => acc += (product.price * product._pivot_quantity), 0);
  }

  render() {
    return (
      <div onClick={() => this.props.toggle()} style={{width: '100%', minHeight: '100px', display: 'inline-block', cursor: 'pointer'}}>
        <div style={{display: 'inline-block', width: '15%'}}>
          <div style={{color: 'teal', alignText: 'left', fontSize: 'large', fontWeight: 'bold'}}>
            {this.props.transaction.cart[0].user_id ? this.props.transaction.cart[0].user_id : 'Amazon'}
          </div><br/>
          <div style={{position: 'relative', display: 'inline-block', color: 'maroon', alignText: 'left'}}>
            ${this.total.toFixed(2)}
          </div>
        </div>
        <div style={{display: 'inline-block', verticalAlign: 'top', paddingLeft: '10px', width: '80%'}}> 
          <div style={{width: '100%'}}>
            <div style={{width: '100%'}}>
              {this.props.transaction.cart.map((product, i) => {
                return (
                  <div style={{alignText: 'left'}} key={i} >
                    <div style={{color: 'maroon', display: 'inline-block'}}>{`${product._pivot_quantity}x`}</div>&nbsp;
                    <div style={{color: 'teal', display: 'inline-block'}}>{product.title.split(':')[0].split(',')[0].split('(')[0]}</div>
                    <div>{product.description}</div>
                  </div>);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailedTransactionSummary;