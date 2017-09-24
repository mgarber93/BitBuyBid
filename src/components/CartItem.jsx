import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, removeFromCart, decrementItem} from '../store/modules/products.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const CartItem = ({item, addToCart, removeFromCart, quantities, decrementItem}) => {
  return (
    <div>
      <Card>
        <div>
          <h4>{item.title}</h4> <br/>
          {/* <Link to={`/product?id=${item.id}`}><img src={item.img_url_sm}/></Link> */}
          <button onClick={ () => { addToCart(item); } }>+</button>
          <span> {quantities[item.prod_id] || quantities[item.id]} </span>
          <button onClick={ () => { decrementItem(item); } }>-</button><br/>
          <button onClick={ () => { removeFromCart(item); } }>Remove from Cart</button>
          <p>${item.price ? Number(item.price).toFixed(2) : 0}</p>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quantities: state.products.quantities
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addToCart, removeFromCart, decrementItem}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);