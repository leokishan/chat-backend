const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		messageId: {
			type: 'ObjectId',
			ref: 'Messages'
		},
		path: String,
		mediaType: {
			type: String
		}
	},
	{
		collection: 'Media',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);

module.exports = userSchema;
