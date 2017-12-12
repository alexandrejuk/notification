const express = require('express');
const route = express.Router();
const notificationCtrl = require('../controllers/notification');

route.get('/notifications', notificationCtrl.getNotification);
route.get('/notification/total/:id', notificationCtrl.getTotalOfNotificationUser);
route.get('/notification/:id', notificationCtrl.getNotificationUser);
route.post('/notifications', notificationCtrl.postNotification);
route.put('/notification/:id', notificationCtrl.putNotification);

module.exports = route;