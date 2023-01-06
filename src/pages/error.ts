import { app } from '../app';

app.use((_, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((_, res) => {
  res.status(500).send("Sorry can't find that!");
});
