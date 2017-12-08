const mongoose = require('mongoose');
  
mongoose.connect('mongodb://localhost/notification', { useMongoClient: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connection database with success!'));

module.exports = db;