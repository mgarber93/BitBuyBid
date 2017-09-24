import React, { Component } from 'react';
import DetailedTransactionSummary from './DetailedTransactionSummary.jsx';
import ConciseTransactionSummary from './ConciseTransactionSummary.jsx';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailed: false
    };
    this.toggleDetails = this.toggleDetails.bind(this);
  }

  toggleDetails() {
    this.setState({
      isDetailed: !this.state.isDetailed
    });
  }

  render() {
    return (
      this.state.isDetailed ? 
        <DetailedTransactionSummary toggle={this.toggleDetails} transaction={this.props.transaction}/> :
        <ConciseTransactionSummary toggle={this.toggleDetails} transaction={this.props.transaction}/>
    );
  }
}

export default Transaction;