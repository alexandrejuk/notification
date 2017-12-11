const mongoose = require('mongoose');
const Notification = require('../models/notification');
const Group = require('../models/group');

const filterGroup = (acc, item) => {
  if (acc.id_user !== item.id_user) acc.push(item);
  return acc;
};

const postNotification = (req, res, next) => {
  const groups = req.body.groups;
  Group.find({ _id: { $in: groups } }, { _id: 0,'ids.id_user': 1 })
    .then(group => group)
    .reduce(filterGroup)
    .then(ids => { 
      req.body.ids = ids.ids;  
      return req.body;})
    .then(body => {
      const newNotification = new Notification(body);
      newNotification
        .save()
        .then(notification => res.json(notification))
        .catch(err => next(err));
    });
};

const putNotification = (req, res, next) => {
  const id = req.params.id;
  const notification = req.body;
  Notification.findByIdAndUpdate(id, notification, {
    runValidators: true
  }).then(notification => res.json(notification));
};

const getNotification = (req, res, next) => {
  Notification.find({})
    .then(notification => res.json(notification))
    .catch(err => next(err));
};

const getTotalOfNotificationUser = (req, res, next) => {
  const id = req.params.id;
  const view = req.query.view || false;

  Notification.find({
      ids: {
        $elemMatch: {
          id_user: id,
          view: view
        }
      }
    })
    .count()
    .then(total => res.json(total));
};

const getNotificationUser = (req, res, next) => {
  const id = req.params.id;
  const view = req.query.view || false;

  Notification.find({
    ids: {
      $elemMatch: {
        id_user: id,
        view: view
      }
    }
  }).then(
    notifications => res.json(notifications)
  );
};

module.exports = {
  getNotification,
  getTotalOfNotificationUser,
  getNotificationUser,
  postNotification,
  putNotification
};