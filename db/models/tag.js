const db = require('../');

const Tag = db.Model.extend({
  tableName: 'tags',
});

module.exports = db.model('Tag', Tag);
