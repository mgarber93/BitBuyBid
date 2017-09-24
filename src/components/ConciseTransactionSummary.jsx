import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import { Link } from 'react-router-dom';

class ConciseTransactionSummary extends Component {
  constructor(props) {
    super(props);
    this.total = this.calculateTotal(props.transaction.cart);
  }

  calculateTotal(cart) {
    return cart.reduce((acc, product) => acc += (product.price * product._pivot_quantity), 0);
  }

  render() {
    return (
      <div onClick={() => this.props.toggle()} style={{width: '100%', height: '100px', display: 'inline-block', cursor: 'pointer'}}>
        <div style={{display: 'inline-block', width: '15%'}}>
          <div onClick={() => this.props.toggle()} style={{color: 'teal', alignText: 'left', fontSize: 'large', fontWeight: 'bold'}}>
            {(this.props.transaction.cart[0] && this.props.transaction.cart[0].user_id) || 'Amazon'}
          </div><br/>
          <div style={{position: 'relative', display: 'inline-block', color: 'maroon', alignText: 'left'}}>
            ${this.total.toFixed(2)}
          </div>
        </div>
        <div style={{display: 'inline-block', verticalAlign: 'top', paddingLeft: '10px', width: '80%', height: '100%'}}> 
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflowY: 'auto', height: '100%', width: '100%'}}>
            <GridList cols={1} cellHeight={35} style={{height: '100%', width: '100%'}}>
              {this.props.transaction.cart.map((product, i) => {
                return (
                  <GridTile containerElement={'div'} style={{alignText: 'left'}} cols={1} key={i} >
                    <div style={{color: 'maroon', display: 'inline-block'}}>{`${product._pivot_quantity}x`}</div>&nbsp;
                    <div style={{color: 'teal', display: 'inline-block'}}>{product.title.split(':')[0].split(',')[0].split('(')[0]}</div>
                    <div>{product.description.slice(0, 100)}</div>
                  </GridTile>);
              })}
            </GridList>
          </div>
        </div>
      </div>
    );
  }
}

export default ConciseTransactionSummary;