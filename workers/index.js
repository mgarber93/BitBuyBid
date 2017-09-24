module.exports = (models) => {
  // require('./overstock')(models);
  // require('./amazon')(models);
  require('./exchange')(models);

  var CronJob = require('cron').CronJob;

  new CronJob('0 * * * *', function() {
    require('./overstock')(models);
    require('./amazon')(models);
    require('./exchange')(models);
  }, null, true, 'America/Los_Angeles');
};
