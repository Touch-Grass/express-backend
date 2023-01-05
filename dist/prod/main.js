


const express=require("express");const bodyParser=require("body-parser");const cors=require("cors");const passport=require("passport");const LocalStrategy=require("passport-local");const session=require("express-session");const mongoose=require("mongoose");const bcrypt=require("bcryptjs");


const app = express();
const port = process.env.PORT || 8080;
app.use(session({
    secret: 'abdofjadfjaofijdsoafaiosdjf',
    resave: false,
    saveUninitialized: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});


const chatRouter = express.Router();
chatRouter.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({ message: 'Authenticated', status: 200 });
    }
    else {
        res.json({ message: 'Not Authenticated', status: 401 });
    }
});


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







bcrypt;
const loginRouter = express.Router();
const User = mongoose.model('userSchema', userSchema);
loginRouter.get('/', (req, res) => {
    if (req.isAuthenticated())
        res.send({ message: `${req.user} already logged in`, status: 200 });
    else
        res.json({ message: 'Not logged in! Please login', status: 401 });
});
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    });
}));
loginRouter.post('/login', (_req, res, _next) => {
    res.send('Logged in');
});


const testrouter = express.Router();
testrouter.get('/', (_, res) => {
    res.send('Hello World!');
});






app.use('/test', testrouter);
app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);
app.listen(port, () => console.log(`server started at http://localhost:${port}`));


app.use((_, res) => {
    res.status(404).send("Sorry can't find that!");
});
app.use((_, res) => {
    res.status(500).send("Sorry can't find that!");
});


mongoose.connect('mongodb://mongo:ISRP4uOlwo1Pg39gGJTo@containers-us-west-149.railway.app:6320');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
if (db.readyState === 1) {
    console.log('MongoDB connection is open');
}
else {
    console.log('MongoDB connection is closed');
}



passport.use(new LocalStrategy((username, password, done) => {
    if (username === 'user' && password === 'password') {
        return done(null, { username: 'user', password: 'password' });
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
