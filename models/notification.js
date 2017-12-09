const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

const idSchema = new Schema({
  id_user: { type: String, required: [true, 'This field is required'] },
  view: {
    type: Boolean,
    require: [true, 'This field is required'],
    default: false
  }
});

const notificationSchema = new Schema(
  {
    title: { type: String, required: [true, 'This field is required'] },
    message: { type: String, required: [true, 'This field is required'] },
    groups: { type: [String], required: [true, 'This field is required'] },
    ids: { type: [idSchema], required: [true, 'This field is required'] },
    date: { type: String, required: [true, 'This field is required'] }
  },
  {
    versionKey: false
  }
);
module.exports = db.model('notification', notificationSchema);