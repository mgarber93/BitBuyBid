const db = require('../');

const Exchange = db.Model.extend({
  tableName: 'exchanges',
});

module.exports = db.model('Exchange', Exchange);