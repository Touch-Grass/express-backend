import express from 'express';
// import express from '../../node_modules/@types/express/index';

export const indexRouter = express.Router();

indexRouter.get('/', (_, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ message: `hello, world` });
});

indexRouter.post('/', (req, res) => {
  console.log('got request', req.body);
  res.setHeader('Access-Control-Request-Headers', '*');
  res.json({ message: 'Hi', body: req.body });
});
