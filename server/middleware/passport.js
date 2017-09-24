'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
// const config = require('config')['passport'];
const models = require('../../db/models');

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => {
  return models.User.where({ id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      done(null, profile.serialize());
    })
    .error(error => {
      console.log('Error: ', error);
      done(error, null);
    })
    .catch(() => {
      console.log('failed deserialization no user found');
      done(null, null, { message: 'No user found' });
    });
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(req, email, password, done) => {
  // check to see if there is any account with this email address
  return models.User.where({ email }).fetch()
    .then(profile => {
      // create a new profile if a profile does not exist
      if (!profile) {
        return models.User.forge(
          { 
            email, 
            first: req.body.first, 
            last: req.body.last, 
            username: req.body.username 
          }
        ).save();
      }
      // throw if any auth account already exists
      if (profile) {
        throw profile;
      }

      return profile;
    })
    .tap(profile => {
      // create a new local auth account with the user's profile id
      return models.Auth.forge({
        password,
        type: 'local',
        user_id: profile.get('id')
      }).save();
    })
    .then(profile => {
      // serialize profile for session
      done(null, profile.serialize());
    })
    .error(error => {
      console.error(error);
      done(error, null);
    })
    .catch(err => {
      console.error(err);
      done();
    });
}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(req, email, password, done) => {
  // fetch any profiles that have a local auth account with this email address
  return models.User.where({ email }).fetch({
    withRelated: [{
      auths: query => query.where({ type: 'local' })
    }]
  })
    .then((profile) => {
      // if there is no profile with that email or if there is no local auth account with profile
      if (!profile || !profile.related('auths').at(0)) {
        throw Error('User not Found');
      }

      // check password and pass through account
      return Promise.all([profile, profile.related('auths').at(0).comparePassword(password)]);
    })
    .then(([profile, match]) => {
      if (!match) {
        throw profile;
      }
      // if the password matches, pass on the profile
      return profile;
    })
    .then(profile => {
      // call done with serialized profile to include in session
      done(null, profile.serialize());
    })
    .error(err => {
      done();
    })
    .catch((e) => {
      done(null, null, {
        'message': 'Signing up requires an email address, \
          please be sure there is an email address associated with your Facebook account \
          and grant access when you register.' });   
    });
}));


module.exports = passport;
