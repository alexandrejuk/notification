const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    title: { type: String, required: [true, 'This field is required'] },
    body: { type: String, required: [true, 'This field is required'] },
    groups: [String],
    ids: [String ]
  },
  {
    versionKey: false
  }
);
module.exports = db.model('notification', notificationSchema);
