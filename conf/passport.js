/**
 * Created by congshan on 7/7/16.
 */
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/User.js');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        new User().findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                new User().findOne(username, function(err, user) {
                    if (err) { return done(err); }
                    if (user) { // username exists
                        return done(null, false, req.flash('signupMessage', 'Username already taken.'));
                    } else {
                        var newUser = new User();
                        newUser.username = username;
                        newUser.password = password;
                        newUser.save(function(err, user) {
                            if (err || user == null) {
                                throw err;
                            }
                            newUser.id = user.id;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            new User().findOne(username, function(err, user) {
                if (err) { return done(err); }
                if (user == null) {
                    return done(null, false, req.flash('loginMessage', 'User not found.'));
                } else {
                    var newUser = new User();
                    newUser.id = user.id;
                    newUser.username = user.username;
                    newUser.password = user.password;
                    if (!newUser.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    } else {
                        return done(null, newUser);
                    }
                }
            });

        }));
};