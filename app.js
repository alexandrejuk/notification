const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

const notificationRoute = require('./routes/notification');
const groupRoute = require('./routes/group');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 

app.use('/api', notificationRoute);
app.use('/api', groupRoute);
app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    
    socket.on('add-message', (message) => {
        console.log(message)
      io.emit('message', {type:'new-message', text: message});    
    });
  });
  
      
    
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

module.exports = server;