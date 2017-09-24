const db = require('../');

const Review = db.Model.extend({
  tableName: 'reviews',
  author: function() {
    return this.hasMany('User', 'author_id');
  },
  product: function() {
    return this.hasMany('Product', 'seller_id');
  },
  transaction: function() {
    return this.hasOne('Transaction');
  }
});

module.exports = db.model('Review', Review);
