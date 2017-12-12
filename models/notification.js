const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

const ViewSchema = new Schema({
  user_id: { type: String, required: [true, 'This field is required'] },
  name: { type: String, required: [true, 'This field is required'] },
  viewed: {
    type: Boolean,
    require: [true, 'This field is required'],
    default: false
  }
}, { _id : false });

const notificationSchema = new Schema(
  {
    title: { type: String, required: [true, 'This field is required'] },
    message: { type: String, required: [true, 'This field is required'] },
    groups: { type: [String], required: [true, 'This field is required'] },
    views: { type: [ViewSchema], required: [true, 'This field is required'] },
    date: { type: String, required: [true, 'This field is required'] }
  },
  {
    versionKey: false
  }
);
module.exports = db.model('notification', notificationSchema);