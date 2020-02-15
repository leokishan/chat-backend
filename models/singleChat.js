const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singleChatSchema = new Schema(
	{
		forId: {
			type: 'ObjectId',
			ref: 'Users'
		},
		withId: {
			type: 'ObjectId',
			ref: 'Users'
		},
		lastRead: Date
	},
	{
		collection: 'SingleChat',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);

module.exports = singleChatSchema;
