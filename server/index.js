'use strict';
const app = require('./app');
const models = require('../db/models');
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`BitBuy listening on port ${PORT}!`);
});

// start cronjobs
require('../workers')(models);