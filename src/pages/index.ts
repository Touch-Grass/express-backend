import express from 'express';
// import express from '../../node_modules/@types/express/index';

export const indexRouter = express.Router();

indexRouter.get('/', (_, res) => {
    console.log('got request', res, res.locals);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ message: 'HI' });
});

indexRouter.post('/', (req, res) => {
    res.setHeader('Access-Control-Request-Headers', '*');
    res.json({ message: 'HI', body: req.body });
});
