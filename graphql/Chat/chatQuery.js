const { GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const { MessageOutput, ChatHead } = require('./messageObjects');
const { messages, singleChat } = require('../../models/index');

const userChat = {
	type: GraphQLList(MessageOutput),
	args: {
		userId: { type: new GraphQLNonNull(GraphQLString) },
		otherUserId: { type: new GraphQLNonNull(GraphQLString) }
	},
	resolve: async (context, args) => {
		let result = await messages
			.find()
			.or([
				{ fromId: args.userId, toId: args.otherUserId },
				{ fromId: args.otherUserId, toId: args.userId }
			])
			.populate('fromId toId', 'username')
			.exec();
		return result;
	}
};

const chatList = {
	type: GraphQLList(ChatHead),
	args: {
		userId: { type: new GraphQLNonNull(GraphQLString) }
	},
	resolve: async (context, args) => {
		let chatHeads = await singleChat
			.find({ forId: args.userId })
			.populate('forId withId', 'username')
			.exec();
		let promises = chatHeads.map((user) => {
			return new Promise((resolve, reject) => {
				messages
					.find()
					.or([
						{ fromId: user.forId.id, toId: user.withId.id },
						{ fromId: user.withId.id, toId: user.forId.id }
					])
					.sort({
						createdAt: -1
					})
					.limit(1)
					.populate('fromId toId', 'username')
					.exec(async (err, doc) => {
						if (!err) {
							let date = new Date(user.lastRead);
							let count = await messages
								.find()
								.or([
									{
										fromId: user.forId.id,
										toId: user.withId.id
									},
									{
										fromId: user.withId.id,
										toId: user.forId.id
									}
								])
								.where('createdAt')
								.gt(date.getTime())
								.countDocuments()
								.exec();
							doc[0]['unreadCount'] = count;
							doc[0]['lastRead'] = user.lastRead;
							resolve(doc[0]);
						}
					});
			});
		});
		return Promise.all(promises).then((docs) => docs.map((ele) => ele));
	}
};

module.exports = {
	userChat,
	chatList
};
