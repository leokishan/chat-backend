const { GraphQLID, GraphQLString, GraphQLObjectType } = require('graphql');
const { GraphQLDateTime } = require('../customScalar');

const userResponse = new GraphQLObjectType({
	name: 'UserResponse',
	fields: {
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime },
		updatedAt: { type: GraphQLDateTime }
	}
});

module.exports = { userResponse };
