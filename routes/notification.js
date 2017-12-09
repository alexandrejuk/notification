const express = require('express');
const route = express.Router();
const notificationCtrl = require('../controllers/notification');

route.get('/notification', notificationCtrl.getNotification);
route.get('/notification/total/:id', notificationCtrl.getTotalOfNotificationUser);
route.get('/notification/:id', notificationCtrl.getNotificationUser);
route.post('/notification', notificationCtrl.postNotification);

module.exports = route;