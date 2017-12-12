const mongoose = require('mongoose');
const Notification = require('../models/notification');
const Group = require('../models/notificationGroup');

const postNotification = (req, res, next) => {
  
  const getUsers = (accUsers, userArr) => {
    for(let i = 0; i < userArr.length; i++){
      const foundUser = accUsers.find(user => user.user_id === userArr[i])
      if(!foundUser){
        accUsers.push(userArr[i])
      }
    }
    return accUsers;
  };
  
  const createViews = user => ({
    user_id: user.user_id,
    name: user.name,
    view: false,
  })

  const groups = req.body.groups;

  Group.find({ _id: { $in: groups } }, { _id: 0,'users.user_id': 1,'users.name': 1 })
    .exec()
    .map(group => group.users)
    .reduce(getUsers, [])
    .map(createViews)
    .then(views => {
      const ntification = Object.assign({}, req.body);
      ntification.views =  views

      const newNotification = new Notification(ntification);
      return newNotification.save()
    })
    .then(notification => res.json(notification))
    .catch(next)
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