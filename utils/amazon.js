const {
  amazon
} = require('../config/api_configs/');

const CryptoJS = require('crypto-js');
const endpoint = 'webservices.amazon.com';
const uri = '/onca/xml';


module.exports.buildAmazonRequest = function(params) {
  const pairs = [];
  const product_list = [];
  params.AWSAccessKeyId = this.access_key_id;
  params.AssociateTag = this.associate_tag;
  if (!params.hasOwnProperty('Timestamp')) {
    params['Timestamp'] = new Date().toISOString();
  }
  let keys = Object.keys(params).sort();
  keys.forEach(key =>
    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
  );
  let canonical_query_string = pairs.join('&');
  let string_to_sign = `GET\n${endpoint}\n${uri}\n${canonical_query_string}`;
  let hash = CryptoJS.HmacSHA256(string_to_sign, this.secret_key);
  let signature = hash.toString(CryptoJS.enc.Base64);
  return `http://${endpoint}${uri}?${canonical_query_string}&Signature=` + encodeURIComponent(signature);
}.bind(amazon);
