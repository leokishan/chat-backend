const { GraphQLString, GraphQLNonNull } = require('graphql');
const encryptPassword = require('../../config/auth.config').encryptPassword;
const UserModel = require('../../models/index').users;
const { userResponse } = require('./userResponse');

const addUser = async (context, args) => {
	const { username, password } = args;
	let encryptedPwd = await encryptPassword(password);
	let result = await UserModel.create({
		username,
		password: encryptedPwd
	})
		.then((sucObj) => sucObj)
		.catch((errObj) => {
			console.log('err', errObj);
		});
	return result;
};

const signUp = {
	type: userResponse,
	args: {
		username: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) }
	},
	resolve: addUser
};

module.exports = { signUp };
