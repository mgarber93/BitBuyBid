const db = require('../');


const Purchase = db.Model.extend({
  tableName: 'purchases',
  transaction: function() {
    return this.belongsTo('Transactions', 'transaction_id', 'id');
  },
  product: function() {
    return this.belongsTo('Products', 'product_id', 'id');
  },
  review: function() {
    return this.belongsTo('Reviews', 'review_id', 'id');
  },
  amazon_receipt: function() {
    return this.belongsTo('amazon_purchases');
  },
  stripe_receipt: function() {
    return this.belongsTo('stripe_purchases');
  }
});

module.exports = db.model('Purchase', Purchase);
