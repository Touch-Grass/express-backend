import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
const e = 'express';
e;
//^^ placeholder for require() imports

import express from 'express';
import passport from 'passport';
export const app = express();
export const port = process.env.PORT || 8080;

app.use(
  session({
    secret: 'abdofjadfjaofijdsoafaiosdjf',
    resave: false,
    saveUninitialized: false
  })
);

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
