const mongoose = require('mongoose');
const userSchema = require('./users');
const userSessionSchema = require('./userSession');
const messagesSchema = require('./messages');
const mediaSchema = require('./media');
const singleChatSchema = require('./singleChat');

const users = mongoose.model('Users', userSchema);
const userSession = mongoose.model('UserSession', userSessionSchema);
const messages = mongoose.model('Messages', messagesSchema);
const media = mongoose.model('Media', mediaSchema);
const singleChat = mongoose.model('SingleChat', singleChatSchema);

module.exports = {
	users,
	userSession,
	messages,
	media,
	singleChat
};
