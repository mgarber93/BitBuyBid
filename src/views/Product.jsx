import React, {Component} from 'react';
import axios from 'axios';
import FeatListing from '../components/FeatListing.jsx';

/*
  we need a way indicate which product to retrieve
  detailed information on. 
  Proposal: save the id in the redux store as 'currentProductId'
  which can then be used to retrieve data from the servers
  or our database
*/

class Product extends Component {
  render() {
    return (
      <div>
        <FeatListing />
      </div>
    );
  }
}

export default Product;