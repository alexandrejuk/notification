const express = require('express');
const route = express.Router();
const groupCtrl = require('../controllers/group');

route.get('/group', groupCtrl.getGroup);
route.post('/group', groupCtrl.postGroup);

module.exports = route;