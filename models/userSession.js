const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSessionSchema = new Schema(
	{
		userId: {
			type: 'ObjectId',
			ref: 'Users'
		},
		token: String,
		deviceType: {
			type: String,
			default: 'web'
		},
		deviceToken: String
	},
	{
		collection: 'UserSession',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);

module.exports = userSessionSchema;
