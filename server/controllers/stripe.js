const { Stripe } = require('../../db/models');

module.exports.stripeCheckout = (req, res) => {
  Stripe.forge({
    trans_id: req.params.id,
    client_ip: req.body.client_ip,
    createAt: req.body.created,
    email: req.body.email,
    payment: req.body.payment
  })
    .save()
    .then(response => res.sendStatus(201))
    .error(err => res.sendStatus(501));
};