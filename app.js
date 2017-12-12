const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const notificationRoute = require('./routes/notification');
const groupRoute = require('./routes/group');

app.use(morgan('dev'));
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

app.use('/api', notificationRoute);
app.use('/api', groupRoute);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

module.exports = app;
