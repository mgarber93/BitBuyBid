const db = require('../');

const Transaction = db.Model.extend({
  tableName: 'transactions',
  buyer: function() {
    return this.belongsTo('User', 'buyer_id');
  },
  cart: function() {
    return this.belongsToMany('Product').through('Purchase').withPivot(['quantity', 'status']);
  }
});

module.exports = db.model('Transaction', Transaction);
