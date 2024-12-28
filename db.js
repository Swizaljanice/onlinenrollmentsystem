const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/enrollment_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => console.error('DB connection error: ', err));
db.once('open', () => {
  console.log('DB connected');
});

module.exports = db;
