const axios = require('axios');

const { overstock } = require('../config/api_configs/');
axios.defaults.headers.common['Authorization'] = overstock.Authorization;

/**
 * Query overstock api with each category and insert the resulting
 * data into the database.
 */
module.exports = ({Product}) => {
  axios.get('https://product-search.api.cj.com/v2/product-search?', {
    params: {
      'website-id': overstock['website-id'],
      'keywords': 'laptop apple windows'
    }
  })
    .then(results => {
      Product.fromOverstock(results);
    })
    .catch(err => {
      console.log(err);
    });
};
