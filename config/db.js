const mongoose = require('mongoose');
const blueBird = require('bluebird');
mongoose.connect('mongodb://localhost/notification', { useMongoClient: true });
mongoose.Promise = blueBird.Promise;
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connection database with success!'));

module.exports = db;