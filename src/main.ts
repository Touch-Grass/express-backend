import { testrouter } from './pages/testroute';
import { indexRouter } from './pages/index';
import { chatRouter } from './pages/chat';
import { app, port } from './app';
import { loginRouter } from './pages/login';

app.use('/test', testrouter);
app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);

app.listen(port, () => console.log(`server started at http://localhost:${port}`));
