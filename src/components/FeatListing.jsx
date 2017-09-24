import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card } from 'material-ui/Card';
import { Link } from 'react-router-dom';

const style = {
  image: {
    float: 'left',
    left: '10px',
    top: '10px',
    margin: '0 auto',
    maxHeight: '300px',
    display: 'inline-block'
  },
  title: {
    display: 'inline-block'
  },
  rating: {
    
  },
  description: {
    
  }
};

class FeatListing extends Component {
  render() {
    const selected = this.props.products[this.props.selectedId];
    return (
      <div>
        {selected ? 
          <div>
            <Card><img src={selected.img_url_lg} style={style.image}/></Card>
            <Card><h2 style={style.title}>{selected.title}</h2></Card>
            <Card><div style={style.rating}>Rating: {selected.rating}</div></Card>
            <Card><div style={style.description}>{selected.description}</div></Card>
          </div> :
          <div>Product not found</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    selectedId: state.products.selectedId
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({}, dispatch);
// };

export default connect(mapStateToProps)(FeatListing);