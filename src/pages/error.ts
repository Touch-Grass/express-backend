import { app } from '../app';

// 404 err
app.use((_, res) => {
  res.status(404).send("Sorry can't find that!");
});

// 505 err
app.use((_, res) => {
  res.status(500).send("Sorry can't find that!");
});
