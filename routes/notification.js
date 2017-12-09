const express = require('express');
const route = express.Router();
const notificationCtrl = require('../controllers/notification');

route.get('/notification', notificationCtrl.getNotification);
route.post('/notification', notificationCtrl.postNotification);

module.exports = route;