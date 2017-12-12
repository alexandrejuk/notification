const express = require('express');
const route = express.Router();
const groupCtrl = require('../controllers/group');

route.get('/groups', groupCtrl.getGroups);
route.get('/group/:id', groupCtrl.getGroupById);
route.post('/groups', groupCtrl.postGroup);
route.put('/group/:id', groupCtrl.putGroup);


module.exports = route;