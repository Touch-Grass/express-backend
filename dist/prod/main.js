


const express=require("express");const bodyParser=require("body-parser");const cors=require("cors");const passport=require("passport");const LocalStrategy=require("passport-local");const session=require("express-session");

const app = express();
const port = process.env.PORT || 8080;
app.use(session({
    secret: 'abdofjadfjaofijdsoafaiosdjf',
    resave: false,
    saveUninitialized: false
}));
app.use(cors());
app.use(bodyParser.json());


const chatRouter = express.Router();
chatRouter.get('/', (_, res) => {
    res.send('Hello World!');
});

"use strict";


const indexRouter = express.Router();
indexRouter.get('/', (_, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ message: `hello, world` });
});
indexRouter.post('/', (req, res) => {
    console.log('got request', req.body);
    res.setHeader('Access-Control-Request-Headers', '*');
    res.json({ message: 'Hi', body: req.body });
});


const testrouter = express.Router();
testrouter.get('/', (_, res) => {
    res.send('Hello World!');
});





app.use('/test', testrouter);
app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/test2', (_, res) => {
    res.send('Hello World!');
});
app.use((req, res) => {
    return res.status(404).send({ message: `Route: ${req.url} Not found.` });
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});




passport.use(new LocalStrategy((username, password, done) => {
    if (username === 'user' && password === 'password') {
        return done(null, { username: 'user' });
    }
    else {
        return done(null, false);
    }
}));
passport.serializeUser((user, done) => {
    if ('username' in user) {
        done(null, user.username);
    }
    else
        done(new Error('Unable to serialize user'));
});
passport.deserializeUser((username, done) => {
    done(null, { username: username });
});
app.use(passport.initialize());
app.use(passport.session());
