const express = require('express');
const route = express.Router();
const groupCtrl = require('../controllers/group');

route.get('/group', groupCtrl.getGroups);
route.get('/group/:id', groupCtrl.getGroupById);
route.post('/group', groupCtrl.postGroup);
route.put('/group/:id', groupCtrl.putGroup);


module.exports = route;