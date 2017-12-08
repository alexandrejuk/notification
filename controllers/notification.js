const mongoose = require('mongoose');
const Notification = require('../models/notification');

const getNotification = (req, res) => {
    res.json({ description: 'Alexandre'});
};

module.exports = { getNotification };