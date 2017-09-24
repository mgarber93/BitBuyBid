const db = require('../db');
const parseString = require('xml2js').parseString;
const CryptoJS = require('crypto-js');
const axios = require('axios');
const { amazon } = require('../config/api_configs/');
const endpoint = 'webservices.amazon.com';
const uri = '/onca/xml';
const searchTerm = 'movies'; // default category tag
const pairs = [];
const product_list = [];
const params = {
  'Service': 'AWSECommerceService',
  'Operation': 'ItemSearch',
  'AWSAccessKeyId': amazon.access_key_id,
  'AssociateTag': amazon.associate_tag,
  'SearchIndex': 'All',
  'Keywords': searchTerm,
  'ResponseGroup': 'Images,ItemAttributes'
};
const defaultImage = '';

let keys, canonical_query_string, string_to_sign, hash, signature, request_url, productListings;

if (!params.hasOwnProperty('Timestamp')) {
  params['Timestamp'] = new Date().toISOString();
}

keys = Object.keys(params).sort();

keys.forEach(key =>
  pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
);

canonical_query_string = pairs.join('&');

string_to_sign = `GET\n${endpoint}\n${uri}\n${canonical_query_string}`;

hash = CryptoJS.HmacSHA256(string_to_sign, amazon.secret_key);

signature = hash.toString(CryptoJS.enc.Base64);

request_url = `http://${endpoint}${uri}?${canonical_query_string}&Signature=` + encodeURIComponent(signature);


module.exports = ({Product}) => {
  axios.get(request_url)
    .then(results => {
      Product.fromAmazon(results);
    })
    .catch(err => {
      console.log(err);
    });
};
