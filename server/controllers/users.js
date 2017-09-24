const {User, Transaction, Purchase} = require('../../db/models');

module.exports.getAll = (req, res) => {
  Users.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  User.forge(req.body)
    .save()
    .then(result => {
      res.status(201).send(result.omit('password'));
    })
    .catch(err => {
      if (err.constraint === 'users_username_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};

module.exports.getOne = (req, res) => {
  User.where({ id: req.params.id })
    .fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  User.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
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

module.exports.createActiveCart = (req, res) => {
  if (!req.body.cart || req.body.cart.length === 0) {
    res.status(405).send('You must have a cart');
  }
  if (Number(req.params.id) !== Number(req.user.id)) {
    res.status(401).send('You must be logged in');
  }
  let builtTransaction = {};
  Transaction.forge(
    { 
      buyer_id: req.user.id		
    }
  )
    .save()
    .then(result => {
      builtTransaction = result.toJSON();
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
      return User.where({id: req.params.id})
        .fetch();
    })
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(
        {
          'active_cart': builtTransaction.id
        }, 
        { 
          method: 'update' 
        }
      );
    })
    .then(() => {
      console.log(builtTransaction);
      res.status(201).json(builtTransaction);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    })
    .error(err => {
      console.error(err);
      res.status(500).send(err);
    });
};

module.exports.discardCurrentCart = (req, res) => {
  if (Number(req.params.id) !== Number(req.user.id)) {
    res.status(401).send('You must be logged in');
  }
  return User.where({id: req.params.id})
    .fetch()
    .then(profile => {
      return profile.save(
        {
          'active_cart': null
        },
        {
          method: 'update'
        }
      );
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    })
    .error(err => {
      console.error(err);
      res.status(500).send(err);
    });
};
