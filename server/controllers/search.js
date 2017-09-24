const axios = require('axios');
const { overstock, amazon } = require('../../config/api_configs/');
const { Product, Transaction } = require('../../db/models');
const convert = require('xml-js');
const parseString = require('xml2js').parseString;
const CryptoJS = require('crypto-js');
const endpoint = 'webservices.amazon.com';
const uri = '/onca/xml';
var pairs = [];
var product_list = [];

const params = {
  'Service': 'AWSECommerceService',
  'Operation': 'ItemSearch',
  'AWSAccessKeyId': amazon.access_key_id,
  'AssociateTag': amazon.associate_tag,
  'SearchIndex': 'All',
  'Keywords': '',
  'ResponseGroup': 'Images,ItemAttributes'
};

const defaultImage = '';

let keys, canonical_query_string, string_to_sign, hash, signature, request_url, productListings;


/**
 * Search all apis with a given search term specified in the request body.
 */
module.exports.search = (req, res) => {

  if (!req.body.searchTerm || req.body.searchTerm.trim().length < 2) {
    console.log('search failed: requires body!');
    res.status(400).end(); // bad request
  }

  axios.get(`http://localhost:9200/product/_search?q=tags:${req.body.searchTerm}`)
    .then(({data}) => {
      if (data.hits.total === 0) {
        console.log('searching foreign');
        return;
      }

      throw [data.hits.hits.map(({_source, _score}) => {
        _source.score = _score;
        return _source;
      }), undefined];
    })
    .then(() => {
      return Promise.all([searchOverstock(req.body.searchTerm), searchAmazon(req.body.searchTerm)]);
    })
    .then(responses => {
      if (!responses || (!responses[0] && !responses[1])) {
        throw new Error('no response from amazon or overstock!');
      }

      return Promise.all([Product.fromOverstock(responses[0]), Product.fromAmazon(responses[1])]);
    })
    .then(results => {
      throw results;
    })
    .catch(results => {
      if (!Array.isArray(results)) {
        throw results;
      }
      res.json({results: (results[1] || []).concat(results[0] || [])}).status(200);
    });
};

/**
 * Search Amazon given a search term.
 *
 * @param {string} searchTerm
 * @param {Promise} - Promise that resolves with a response from amazon
 */
const searchAmazon = searchTerm => {
  params.Timestamp = new Date().toISOString();
  params.Keywords = searchTerm;

  pairs = [];
  const keys = Object.keys(params);
  keys.sort().forEach(key =>
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
  );

  canonical_query_string = pairs.join('&');

  string_to_sign = `GET\n${endpoint}\n${uri}\n${canonical_query_string}`;

  hash = CryptoJS.HmacSHA256(string_to_sign, amazon.secret_key);

  signature = hash.toString(CryptoJS.enc.Base64);

  request_url = `http://${endpoint}${uri}?${canonical_query_string}&Signature=` + encodeURIComponent(signature);

  return axios.get(request_url)
    .catch(err => null);
};

const searchOverstock = searchTerm => {
  return axios.get('https://product-search.api.cj.com/v2/product-search?', {
    params: {
      'website-id': overstock['website-id'],
      'keywords': searchTerm
    }
  })
    .catch((err) => null);
};
