// import express from 'express';
import express from '../../node_modules/@types/express/index';

export const chatRouter = express.Router();

chatRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ message: 'Authenticated', status: 200 });
  } else {
    res.json({ message: 'Not Authenticated', status: 401 });
  }
});
