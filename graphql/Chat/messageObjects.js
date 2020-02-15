const { GraphQLString, GraphQLObjectType, GraphQLInt } = require('graphql');
const { GraphQLDateTime } = require('../customScalar');
const { userResponse } = require('../User/userResponse');

const MessageOutput = new GraphQLObjectType({
	name: 'MessageOutput',
	description: 'output',
	fields: {
		fromId: { type: userResponse },
		toId: { type: userResponse },
		message: { type: GraphQLString },
		createdAt: { type: GraphQLDateTime }
	}
});

const MessageInput = {
	fromId: { type: GraphQLString },
	toId: { type: GraphQLString },
	message: { type: GraphQLString }
};

const UpdateUnreadCount = {
	fromId: { type: GraphQLString },
	toId: { type: GraphQLString }
};

const ChatHead = new GraphQLObjectType({
	name: 'ChatHead',
	description: 'chat head',
	fields: {
		fromId: { type: userResponse },
		toId: { type: userResponse },
		message: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		lastRead: { type: GraphQLDateTime },
		unreadCount: { type: GraphQLInt }
	}
});

module.exports = { MessageInput, MessageOutput, ChatHead, UpdateUnreadCount };
