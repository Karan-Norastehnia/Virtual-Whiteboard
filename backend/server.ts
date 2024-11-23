const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

require('dotenv').config();

const app = express();

app.use('/', express.static(path.join(__dirname, '../frontend/build')))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
    console.log('ser')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('deser')
    done(null, id);
});

app.get('/auth', passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
});

app.listen(3000);
