const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: String,
		password: String,
		profilePic: String,
		sessions: [
			{
				type: 'ObjectId',
				ref: 'UserSession'
			}
		]
	},
	{
		collection: 'Users',
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);

module.exports = userSchema;
