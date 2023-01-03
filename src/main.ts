import { testrouter } from './pages/testroute';
import { indexRouter } from './pages/index';
import { chatRouter } from './pages/chat';
import { app, port } from './app';

app.use('/test', testrouter);
app.use('/', indexRouter);
app.use('/chat', chatRouter);

app.use('/test2', (_, res) => {
  res.send('Hello World!');
});

app.use((req, res) => {
  return res.status(404).send({ message: `Route: ${req.url} Not found.` });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
