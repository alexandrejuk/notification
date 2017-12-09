const mongoose = require('mongoose');
const db = require('../config/db');

const Schema = mongoose.Schema;

const idSchema = new Schema({
  id: { type: String, required: [true, 'This field is required'] }
})
const groupSchema = new Schema(
  {
    name: { type: String, required: [true, 'This field is required'] },
    ids: { type: [idSchema], required: [true, 'This field is required'] }
  },
  {
    versionKey: false
  }
);
module.exports = db.model('group', groupSchema);
