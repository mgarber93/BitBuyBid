const express = require('express');
const middleware = require('../middleware');
const urlencodedParser = require('body-parser').urlencoded({extended: false});

const router = express.Router();
// middleware.auth.verify, 
// reenable middleware
router.route('/')
  .get((req, res) => {
    res.render('index.ejs');
  });

router.route('/login')
  .get((req, res) => {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  })
  .post(urlencodedParser, middleware.passport.authenticate('local-login'), 
    (req, res) => {
      if (req.user) {
        req.user.auths = undefined;
        delete req.user.auths;
        res.json(req.user);
      } else {
        res.status(401);
      }
    
    });

router.route('/signup')
  .get((req, res) => {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  })
  .post(middleware.passport.authenticate('local-signup'), (req, res) => {
    if (req.user) {
      req.user.auths = undefined;
      delete req.user.auths;
      res.json(req.user);
    } else {
      res.status(401);
    }
  });

router.route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router.get('/auth/google', middleware.passport.authenticate('google', {
  scope: ['email', 'profile']
}));

router.get('/auth/google/callback', middleware.passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login'
}));

router.get('/auth/facebook', middleware.passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback', middleware.passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/auth/twitter', middleware.passport.authenticate('twitter'));

router.get('/auth/twitter/callback', middleware.passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}));

module.exports = router;
