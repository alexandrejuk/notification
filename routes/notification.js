const express = require('express');
const route = express.Router();
const notificationCtrl = require('../controllers/notification');

route.get('/notification', notificationCtrl.getNotification);

module.exports = route;