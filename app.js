const express = require('express');
const app = express();
const port = 3000;
const notificationRoute = require('./routes/notification');

app.use('/api', notificationRoute);
app.listen(port, () => console.log('Backend running...'));