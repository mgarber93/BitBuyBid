import React, { Component } from 'react';
import { setSearchTerm, searchTypes } from '../store/modules/search.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { setProducts, selectProduct } from '../store/modules/products.js';
import AutoComplete from 'material-ui/AutoComplete';

const style = {
  search: {
    width: '50%', 
    position: 'fixed', 
    left: '25%', 
    margin: '0 auto'
  }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      let text = e.target.value;
      this.props.setSearchTerm(text);
      this.props.setProducts(text);
    }
  }

  render() {
    return (
      <div style={style.search}>
        <Card>
          <AutoComplete 
            id="searchfield"
            hintText="bitbuy a new..."
            dataSource={this.props.dataSource}
            onKeyPress={this.handleSearch}
            fullWidth={true}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({search}) => {
  return {
    term: search.term,
    dataSource: search.dataSource,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSearchTerm,
    setProducts
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
