// import express from 'express';

// export const chatRouter = express.Router();

// chatRouter.get('/chat', (_, res) => {
//   res.send('HI FROM CHAT');
//   // if (req.isAuthenticated()) {
//   //   res.send('Authenticated');
//   // } else {
//   //   res.send('Unauthe123nticated');
//   // }
// });
import express from 'express';

export const chatRouter = express.Router();

chatRouter.get('/', (_, res) => {
  res.send('Hello World!');
});
