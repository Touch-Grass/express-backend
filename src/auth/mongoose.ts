import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:ISRP4uOlwo1Pg39gGJTo@containers-us-west-149.railway.app:6320');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

if (db.readyState === 1) {
    console.log('MongoDB connection is open');
} else {
    console.log('MongoDB connection is closed');
}
