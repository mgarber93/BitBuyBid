const db = require('../');

const User = db.Model.extend({
  tableName: 'users',
  auths: function() {
    return this.hasMany('Auth');
  },
  activeCart: function() {
    return this.belongsTo('Transaction', 'active_cart', 'id');
  },
  address: function() {
    return this.hasOne('Address');
  }
});

module.exports = db.model('User', User);
