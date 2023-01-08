import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';

// Configure Passport.js to use a local strategy
passport.use(
    new LocalStrategy((username, password, done) => {
        // Validate the user's credentials
        if (username === 'user' && password === 'password') {
            return done(null, { username: 'user', password: 'password' });
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
