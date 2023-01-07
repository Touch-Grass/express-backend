// import express from 'express';
import express from '../../node_modules/@types/express/index';

export const testrouter = express.Router();

testrouter.get('/', (_, res) => {
  res.send('Hello World!');
});
