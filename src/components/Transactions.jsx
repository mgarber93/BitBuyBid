import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setTransactions} from '../store/modules/transactions.js';
import Transaction from './Transaction.jsx';
import { Card } from 'material-ui/Card';

const mapStateToProps = state => {
  return {
    transactions: state.transactions.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setTransactions
  }, dispatch);
};

class Transactions extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setTransactions();
  }
  
  render() {
    return (
      <div> 
        {this.props.transactions ? 
          (this.props.transactions.reverse().map((transaction, i) => 
            (<Card key={i} style={{padding: '15px', margin: '4px'}}>
              <Transaction key={i} transaction={transaction}/>
            </Card>))
          ) : 
          null}
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);