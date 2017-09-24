const models = require('../models');

exports.seed = function (knex, Promise) {

  return models.User.where({ email: 'admin@domain.com' }).fetch()
    .then((profile) => {
      if (profile) {
        throw profile;
      }
      return models.User.forge({
        first: 'System',
        last: 'Admin',
        username: 'Administrator',
        email: 'admin@domain.com'
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create profile');
      throw err;
    })
    .then((profile) => {
      return models.Auth.forge({
        type: 'local',
        password: 'admin123',
        user_id: profile.get('id')
      }).save();
    })
    .error(err => {
      console.error('ERROR: failed to create auth');
    })
    .catch(err => {
      console.log(err);
      console.log('WARNING: defualt user already exists.');
    });

};
