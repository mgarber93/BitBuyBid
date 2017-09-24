'use strict';
const express = require('express');
const router = express.Router();
const {
  getAll, 
  getOne, 
  update,
  createActiveCart,
  discardCurrentCart
} = require('../controllers').Users;

router.route('/')
  .get(getAll);

router.route('/:id')
  .get(getOne)
  .put(update);

router.route('/:id/cart')
  .post(createActiveCart)
  .delete(discardCurrentCart);

module.exports = router;
