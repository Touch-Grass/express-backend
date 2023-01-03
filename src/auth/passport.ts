import { app } from 'src/app';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

// Configure Passport.js to use a local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    // Validate the user's credentials
    if (username === 'user' && password === 'password') {
      return done(null, { username: 'user' });
    } else {
      return done(null, false);
    }
  })
);

// Configure Passport.js to serialize and deserialize user objects
passport.serializeUser((user, done) => {
  if ('username' in user) {
    done(null, user.username);
  } else done(new Error('Unable to serialize user'));
});

passport.deserializeUser((username, done) => {
  done(null, { username: username });
});

// Configure the Express.js app to use Passport.js
app.use(passport.initialize());
app.use(passport.session());
