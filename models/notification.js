const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

const groupsSchema = new Schema({
  department: {
    type: String,
    required: [true, 'This field is required'],
    default: 'all'
  }
});
const idsSchema = new Schema({
  id: {
    type: String,
    required: [true, 'This field is required'],
    default: 'all'
  }
});

const notificationSchema = new Schema(
  {
    title: { type: String, required: [true, 'This field is required'] },
    body: { type: String, required: [true, 'This field is required'] },
    view: {
      type: Boolean,
      required: [true, 'This field is required'],
      default: false
    },
    groups: {
      type: [groupsSchema],
      required: [true, 'This field is required']
    },
    ids: { type: [idsSchema], required: [true, 'This field is required'] }
  },
  {
    versionKey: false
  }
);
module.exports = db.model('notification', notificationSchema);
