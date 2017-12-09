const mongoose = require('mongoose');
const Notification = require('../models/notification');


const getNotification = (req, res, next) => {
  Notification.find({})
    .then(notification => res.json(notification))
    .catch(err => next(err));
};

const postNotification = (req, res, next) => {
  const newNotification = new Notification(req.body);
  newNotification
    .save()
    .then(notification => res.json(notification))
    .catch(err => next(err));
};


module.exports = { getNotification, postNotification };