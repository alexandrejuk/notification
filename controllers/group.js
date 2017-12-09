const mongoose = require('mongoose');
const Group = require('../models/group');


const getGroup = (req, res, next) => {
    Group.find({})
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


module.exports = { getGroup, postGroup };