const mongoose = require('mongoose');
const Group = require('../models/notificationGroup');

const getGroups = (req, res, next) => {
  Group.find({})
    .then(group => res.json(group))
    .catch(err => next(err));
};

const getGroupById = (req, res, next) => {
  const id = req.params.id;
  Group.find({ _id: id })
    .then(group => res.json(group))
    .catch(err => next(err));
};

const postGroup = (req, res, next) => {
  const newGroup = new Group(req.body);
  newGroup
    .save()
    .then(group => res.json(group))
    .catch(err => next(err));
};

const putGroup = (req, res, next) => {
  const id = req.params.id;
  const group = req.body;
  Group.findByIdAndUpdate(id, group, {
    runValidators: true
  })
    .then(group => res.json(group))
    .catch(err => next(err));
};

module.exports = { 
  getGroups, 
  getGroupById, 
  postGroup, 
  putGroup 
};
