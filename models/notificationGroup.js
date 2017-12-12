const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: { 
    type: String, required: [true, 'This field is required'] 
  },
  name: { 
    type: String, required: [true, 'This field is required'] 
  },
});

const groupSchema = new Schema(
  {
    name: { type: String, required: [true, 'This field is required'] },
    users: { type: [UserSchema], required: [true, 'This field is required'] }
  },
  {
    versionKey: false
  }
);
module.exports = db.model('notificationGroup', groupSchema);
