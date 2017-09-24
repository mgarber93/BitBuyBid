const {Transaction, Purchase} = require('../../db/models');
const axios = require('axios');
const {overstock} = require('../../config/api_configs/');
axios.defaults.headers.common['Authorization'] = overstock.Authorization;
var convert = require('xml-js');


module.exports.create = (req, res) => {
  if (!req.body.cart || req.body.cart.length === 0) {
    res.status(405).send('You must have a cart');
  }
  let builtTransaction = {};
  Transaction.forge(
    { 
      buyer_id: req.user.id		
    }
  )
    .save()
    .then(result => {
      builtTransaction = result;
      builtTransaction.cart = req.body.cart;
      return Promise.all(
        req.body.cart.map(
          p => {
            Purchase.forge({
              transaction_id: result.id, 
              product_id: p.id,
              quantity: req.body.quantities[p.prod_id] || 1
            })
              .save();
          }
        )
      );
    })
    .then(result => {
      res.json(builtTransaction).status(201);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
};

module.exports.getAll = (req, res) => {
  Transaction.where({buyer_id: req.user.id})
    .fetchAll({
      withRelated: ['cart', 'buyer']
    })
    .then(transactions => {
      res.status(200).send(transactions);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getOne = (req, res) => {
  Transaction.where({ buyer_id: req.params.id })
    .fetch({
      withRelated: ['cart', 'buyer']
    })
    .then(transaction => {
      if (!transaction) {
        throw transaction;
      }
      res.status(200).send(transaction);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  Transaction.where({ id: req.params.id })
    .fetch()
    .then(transaction => {
      if (!transaction) {
        throw transaction;
      }
      return transaction.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  res.status(401).end();
//   Transaction.where({ id: req.params.id })
//     .fetch()
//     .then(transaction => {
//       if (!transaction) {
//         throw transaction;
//       }
//       return transaction.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
};
