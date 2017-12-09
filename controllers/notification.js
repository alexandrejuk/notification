const mongoose = require('mongoose');
const Notification = require('../models/notification');

const postNotification = (req, res, next) => {
  const newNotification = new Notification(req.body);
  newNotification
    .save()
    .then(notification => res.json(notification))
    .catch(err => next(err));
};

const getNotification = (req, res, next) => {
  Notification.find({})
    .then(notification => res.json(notification))
    .catch(err => next(err));
};

const getTotalOfNotificationUser = (req, res, next) => {
  const id = req.params.id;
  const view = req.query.view || false;

  Notification.find({ "ids" : { "$elemMatch" : { "id_user" : id, "view": view  } } }).count()
  .then(total => res.json(total));
}
const getNotificationUser = (req, res, next) => {
  const id = req.params.id;
  const view = req.query.view || false;

  Notification.find({ "ids" : { "$elemMatch" : { "id_user" : id, "view": view  } } })
  .then(total => res.json(total));
}



module.exports = { 
  getNotification, 
  getTotalOfNotificationUser, 
  getNotificationUser, 
  postNotification 
};