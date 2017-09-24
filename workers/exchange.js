const axios = require('axios');

module.exports = ({Exchange}) => {

  return axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD')
    .then((data) => {
      return Exchange.forge({
        'dollar_amt': data.data.data.amount,
      })
        .save();   
    })
    .then(() => {
      console.log('Successfully added current btc to usd exchange');
    })
    .catch(console.error);
};