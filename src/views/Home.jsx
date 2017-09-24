import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Search from '../components/Search.jsx';
import CartWidget from '../components/CartWidget.jsx';
import Listing from '../components/Listing.jsx';

class Home extends React.Component {
  static fetchData(store) {
    return store;
  }

  render() {
    return (
      <div>
        <CartWidget/>
        <Search/> 
        <Paper style={{position: 'relative', top: '60px', textAlign: 'center', backgroundColor: 'white'}}>
          {this.props.products.map(p => p.img_url_sm ? <Listing style={{display: 'inline-block', padding: '15px'}} item={p} key={p.id} /> : null)}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({products}) => ({
  products: products.products,
});

export default connect(mapStateToProps)(Home);