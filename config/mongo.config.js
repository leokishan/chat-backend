const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chats', {
	autoIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false
});
// mongoose.set('debug', true);
let db = mongoose.connection;

db.once('open', () => console.log('mongo connected'));

module.exports = db;
