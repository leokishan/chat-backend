const {
	GraphQLList,
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull
} = require('graphql');
const UserModel = require('../../models/index').users;
const { userResponse } = require('./userResponse');
const comparePwd = require('../../config/auth.config').comparePasswordHash;

// Main user query object which will take args, return field and resolve function
const userList = {
	type: GraphQLList(userResponse),
	args: {},
	resolve: (something, args) => {
		return UserModel.find();
	}
};

const signIn = {
	type: new GraphQLObjectType({
		name: 'SignInRes',
		fields: {
			apikey: { type: GraphQLString },
			userId: { type: GraphQLString }
		}
	}),
	args: {
		username: {
			type: new GraphQLNonNull(GraphQLString)
		},
		password: {
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async (something, args) => {
		let foundUser = await UserModel.findOne({
			username: args.username
		}).exec();
		if (foundUser) {
			let matchedPassword = await comparePwd(
				args.password,
				foundUser.password
			);
			if (matchedPassword)
				return { apikey: 'qwerty', userId: foundUser.id };
			else throw new Error('Invalid password.');
		} else throw new Error('Please register first.');
	}
};

module.exports = { userList, signIn };
