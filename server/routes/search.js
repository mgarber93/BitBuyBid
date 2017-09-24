'use strict';
const express = require('express');
const router = express.Router();
const {
  search
} = require('../controllers').Search;

router.route('/')
  .get(search)
  .post(search)
;

module.exports = router;
