const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

const NotificationModel = require('./models/notification');
const EventNotification = require('./noticationEvent');


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

const usersConnecteds = [];

io.on('connection', clientIo => {

  clientIo.on('new-user-connected', user => {
    user.clientIoID = clientIo.id;
    usersConnecteds.push(user);

    NotificationModel.find({
      views: { $elemMatch: { user_id: user.id, viewed: false } }
    }).then(notifications => {
      clientIo.emit('getNotifications', notifications);
    });
  });

  clientIo.on('disconnect', () => {
    const disconnectUser = usersConnecteds.findIndex(
      user => user.clientIoID === clientIo.id
    );
    if (disconnectUser > -1) {
      usersConnecteds.splice(disconnectUser, 1);
    }
  });
});

EventNotification.on('notification', id => {
  NotificationModel.findById(id).then(notification => {
    const users = notification.views;
    users.forEach(userNtf => {
      const user = usersConnecteds.find(user => user.id === userNtf.user_id);
      if (user) {
        io.sockets.connected[user.clientIoID].emit(
          'notification',
          notification
        );
      }
    });
  });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

module.exports = server;