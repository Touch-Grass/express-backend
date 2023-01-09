import { indexRouter } from './pages/index';
import { chatRouter } from './pages/chat';
import { app, port } from './app';
import { loginRouter } from './pages/login';

app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);

app.use((_, res, next) => {
    console.log('adding loggedIn status to response');
    const originalSend = res.send;
    res.send = (body: Record<string, string>) => {
        body.loggedIn = 'value';
        return originalSend.call(res, body);
    };
    next();
});


app.listen(port, () => console.log(`server started at http://localhost:${port}`));
