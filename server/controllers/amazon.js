const { Transaction, Amazon } = require('../../db/models');
const axios = require('axios');

const {buildAmazonRequest} = require('../../utils').amazon;

const convert = require('xml-js');

/**
 * Create an amazon cart from a transaction in the database.
 * A post to /:id (transaction_id) creates an amazon cart.
 * 
 * Two network calls are required for each amazon cart. 
 * One creates the cart and the next fetches the purchase 
 * url.
 */
module.exports.createAmazonCart = (req, res) => {
  let t;
  Transaction.where({id: req.params.id}) 
    .fetch({
      withRelated: ['cart', 'buyer']
    })
    .then(transaction => {
      t = transaction;
      var c = 1; 
      const items = transaction.relations.cart.models
        .map(o => o._previousAttributes);
      let params = {
        Operation: 'CartCreate',
        Service: 'AWSECommerceService'
      };
      for (const item of items) {
        if (item.asin && item._pivot_quantity) {
          params[`Item.${c}.ASIN`] = item.asin;
          params[`Item.${c}.Quantity`] = item._pivot_quantity;
          c++;
        }
      }
      if (c === 1) {
        throw new Error('no data!');
      }
      return axios.get(buildAmazonRequest(params));
    })
    .then(results => {
      const parsed = JSON.parse(convert.xml2json(results.data,
        {
          compact: true,
          spaces: 2,
          instructionHasAttributes: true
        }
      ));
      const response = {
        trans_id: req.params.id,
        amzn_cart_id: parsed.CartCreateResponse.Cart.CartId._text,
        amzn_HMAC: parsed.CartCreateResponse.Cart.HMAC._text,
        amzn_URLEncodedHMAC: parsed.CartCreateResponse.Cart.URLEncodedHMAC._text,
      };
      let params = {
        Service: 'AWSECommerceService',
        Operation: 'CartGet',
        CartId: `${response.amzn_cart_id}`,
        HMAC: `${response.amzn_HMAC}` 
      };
      return axios.get(buildAmazonRequest(params))
        .then(results => {
          const parsed = JSON.parse(convert.xml2json(results.data,
            {
              compact: true,
              spaces: 2,
              instructionHasAttributes: true
            }
          ));
          try {
            response['amzn_purchase_url'] = parsed.CartGetResponse.Cart.PurchaseURL._text;
            res.json(response).status(200);
          } catch (e) {
            console.error(e);
            res.status(405).end();
          }
          Amazon.forge(response).save();
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
};

module.exports.getAmazonCart = (req, res) => {
  Transaction.where({id: req.params.id})
    .fetch()
    .then(transaction => {
      let params = {
        Service: 'AWSECommerceService',
        Operation: 'CartGet',
        CartId: `${transaction.toJSON().amzn_cart_id}`,
        HMAC: `${transaction.toJSON().amzn_HMAC}` 
      };
      return axios.get(buildAmazonRequest(params));
    })
    .then(results => {
      const parsed = JSON.parse(convert.xml2json(results.data,
        {
          compact: true,
          spaces: 2,
          instructionHasAttributes: true
        }
      ));
      try {
        console.log(parsed.CartGetResponse);
        const response = {
          PurchaseURL: parsed.CartGetResponse.Cart.PurchaseURL._text,
        };
        res.json(response).status(200);
      } catch (e) {
        console.error(e);
        res.status(405).end();
      }
    })
    .catch(err => {
      if (err.status !== 503) {
        console.error(err);
      }
      res.status(500).end();
    });
};
