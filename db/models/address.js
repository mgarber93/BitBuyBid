const db = require('../');

const Address = db.Model.extend({
  tableName: 'addresses'
});

module.exports = db.model('Address', Address);
