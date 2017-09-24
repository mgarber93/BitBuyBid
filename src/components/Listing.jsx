import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart} from '../store/modules/products.js';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const style = {
  listingContainer: {padding: '10px', display: 'inline-block', width: '200px', height: '250px'},
  listingCard: {position: 'relative', width: '100%', height: '100%', border: '2px solid #95a5a6'},
  media: {position: 'relative', width: '95%', height: '100%', paddingTop: '10px', overflow: 'hidden'},
  img: {paddingBottom: '0px', maxWidth: '95%', height: '125px', margin: '0 auto', border: '1px solid black'},
  title: {fontSize: '18px', height: '22px', whiteSpace: 'nowrap', margin: '0 auto', textAlign: 'left', overflow: 'hidden'},
  description: {fontSize: '10px', height: '30px', overflow: 'show', width: '100%', margin: '0 auto', textAlign: 'left', fontStyle: 'italic'},
  seller: {float: 'left', paddingLeft: '10px', fontSize: '10px', fontStyle: 'italic'},
  addToCart: {float: 'right', bottom: '10px'}
};

const Listing = ({item, addToCart}) => {
  return (
    <div style={style.listingContainer}>
      <Card style={{
        ...style.listingCard, 
        //background color needs to be determined upon each instantiation of this component:
        backgroundColor: `${item.type === 'amzn' ? 'Turquoise' : (item.type === 'ovsock' ? 'PaleVioletRed' : 'DarkTurquoise')}`
      }}>
        <div style={style.media}>
          <Link to={`/product?id=${item.id}`}><img style={style.img} src={item.img_url_sm}/></Link>
          <CardText style={{width: '100%'}}>
            <div style={style.title}>{item.title.slice(0, 25)}</div>
            <div style={style.description}>{item.description.slice(0, 100)}</div>
          </CardText>
          <CardActions style={{padding: '0px'}}>
            <div style={style.seller}>{`${item.type === 'amzn' ? 'Amazon' : (item.type === 'ovsock' ? 'Overstock' : 'Unidentified')}`}</div>
            <FlatButton style={style.addToCart} onClick={ () => { addToCart(item); } }>Add to Cart!</FlatButton>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.products.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({addToCart}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
