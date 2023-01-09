import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import addLoggedInStatus from './middleware/addLoggedInStatus';
import Crypto from 'crypto';

export const app = express();
export const port = process.env.PORT || 8080;



app.use(
    session({
        secret: Crypto.randomBytes(64).toString('hex'),
        resave: false,
        saveUninitialized: false
    })
);

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(addLoggedInStatus);