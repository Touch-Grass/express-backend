import express from 'express';

export const testrouter = express.Router();

testrouter.get('/', (_, res) => {
    res.send('Hello World!');
});
