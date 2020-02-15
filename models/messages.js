const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		fromId: {
			type: 'ObjectId',
			ref: 'Users'
		},
		toId: {
			type: 'ObjectId',
			ref: 'Users'
		},
		message: String,
		messageType: {
			type: String,
			default: 'text',
			enum: [ 'media', 'text' ]
		},
		media: {
			type: 'ObjectId',
			ref: 'Media'
		}
	},
	{
		collection: 'Messages',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);

module.exports = userSchema;
