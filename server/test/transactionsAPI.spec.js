'use strict';
const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = require('../../dist/app.js');
const dbUtils = require('../../db/lib/utils.js');

xdescribe('Transactions API', function () {
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('should 401 an unauthenticated user', done => {
    request(app)
      .get('/api/transactions')
      .expect(401)
      .end(done);
  });

  /**
   * @todo Test with real authenticated user when login is functional
   */
  it('should create new transaction for authed user', done => {
    request(app)
      .post('/auth/login', {
        email: 'admin@domain.com',
        password: 'admin123'
      })
      .then(res => {
        console.log(res.status);
        done();
      });
  });

});