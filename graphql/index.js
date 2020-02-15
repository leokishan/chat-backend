const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const userQuery = require('./User/userQuery');
const userMutation = require('./User/userMutation');

const chatMutation = require('./Chat/chatMutation');
const chatQuery = require('./Chat/chatQuery');

const queryObject = new GraphQLObjectType({
	name: 'Query',
	description:
		'This is main query object. This will have all queries within itself.',
	fields: {
		...userQuery,
		...chatQuery
	}
});

const mutationObject = new GraphQLObjectType({
	name: 'mutation',
	description: 'This will have all mutations within itself.',
	fields: {
		...userMutation,
		...chatMutation
	}
});

const schema = new GraphQLSchema({
	mutation: mutationObject,
	query: queryObject
});
module.exports = schema;
