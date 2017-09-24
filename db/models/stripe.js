const db = require('../');
const Purchase = require('./purchase');

const StripePurchase = db.Model.extend({
  tableName: 'stripe_purchases',
  receipt: function() {
    return this.belongsTo(Purchase);
  }
});

module.exports = db.model('stripe_purchase', StripePurchase);
