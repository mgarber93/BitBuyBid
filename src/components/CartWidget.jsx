import React, {Component} from 'react';
import Subtotal from './Subtotal.jsx';
import { Link } from 'react-router-dom';
import {selectProduct, addToCart, removeFromCart, decrementItem} from '../store/modules/products.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import { style } from '../styles.js';

const mapStateToProps = state => {
  return {
    cart: state.products.cart,
    quantities: state.products.quantities
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectProduct,
      decrementItem,
      addToCart,
      removeFromCart
    }, dispatch);
};

class CartWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    };
    this.style = style.cartWidget;
  }

  render() {
    return (this.state.display ? 
      <div style={this.style.root}>
        {this.props.cart.length ? 
          <GridList cols={2} style={this.style.gridList}>
            <Paper cols={2} style={this.style.paper}>
              <div cols={2} style={this.style.header}>
                <div style={this.style.cart}>Cart</div>
                <FlatButton style={this.style.collapse} type='button' onClick={() => this.setState({display: false})} label='collapse'></FlatButton>
              </div>
              {this.props.cart ? this.props.cart.map((product, i) => {
                return (
                  <div cols={1} onClick={() => this.props.selectProduct(product.id)} key={i}>
                    {i > 0 ? <hr/> : null}
                    <Link style={this.style.link} to={`/product?id=${product.id}`}>
                      <img style={this.style.img} src={product.img_url_sm} alt="" />
                    </Link>
                    <Link style={this.style.link} to={`/product?id=${product.id}`}>
                      <CardTitle style={this.style.title} title={product.title}/>
                    </Link>
                    <CardText style={this.style.text}>{product.description.slice(0, 40) + '...'}</CardText>
                    <CardText style={this.style.price}>
                            ${product.price ? Number(product.price).toFixed(2) : 0}
                    </CardText>
                    <CardText style={this.style.delete}>
                            delete&nbsp;&nbsp;&nbsp;quantity:{this.props.quantities[product.prod_id] || this.props.quantities[product.id]}
                    </CardText>
                  </div>
                );
              }) : false}
              <div cols={1} style={this.style.subtotal}>
                <div style={this.style.subTitle}>
                  <b><i>Subtotal:</i></b>
                  <Subtotal/>
                </div>
                <Link to='/cart'><FlatButton>Checkout</FlatButton></Link>
              </div>
            </Paper>
          </GridList> : false}
      </div> : <FlatButton style={this.style.expand} type='button' onClick={() => this.setState({display: true})} label='expand'></FlatButton>
    );
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CartWidget);
