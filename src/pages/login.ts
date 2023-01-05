import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUser, userSchema } from '../Models/user';
import bcrypt from 'bcryptjs';
bcrypt;

export const loginRouter = express.Router();

const User = mongoose.model('userSchema', userSchema);

loginRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) res.send({ message: `${req.user} already logged in`, status: 200 });
  else res.json({ message: 'Not logged in! Please login', status: 401 });
});

// loginRouter.post('/', (req, res) => {
//   if (!('username' in req && 'password' in req && Object.keys(req).length === 2))
//     return res.send({ message: 'Invalid request', status: 400 });
//   const { username, password } = req.body;
// });

// Configure the local authentication strategy

passport.use(
  new LocalStrategy((username, password, done) => {
    // Find the user with the given username
    User.findOne({ username: username }, (err: any, user: IUser) => {
      // If there is an error, return done with the error
      if (err) {
        return done(err);
      }
      // If no user is found, return done with a message
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      // Compare the passwords to see if they match
      bcrypt.compare(password, user.password, (err, isMatch) => {
        // If there is an error, return done with the error
        if (err) {
          return done(err);
        }
        // If the passwords do not match, return done with a message
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        // If the passwords match, return done with the user
        return done(null, user);
      });
    });
  })
);

// Set up the login route
loginRouter.post('/login', (_req, res, _next) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) return next(err);
  //     if (!user) return res.send({ message: info.message, status: 401 });

  //     req.logIn(user, err => {
  //       if (err) return next(err);
  //       return res.send('Logged in');
  //     });
  //   })(req, res, next);
  res.send('Logged in');
});
