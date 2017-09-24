const db = require('../');

const Category = db.Model.extend({
  tableName: 'categories',
  tags: function() {
    return this.hasMany('Tag');
  }
});

module.exports = db.model('Category', Category);
