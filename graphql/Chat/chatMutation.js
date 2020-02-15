const {
	MessageInput,
	MessageOutput,
	UpdateUnreadCount,
	ChatHead
} = require('./messageObjects');
const { messages, singleChat } = require('../../models/index');

const sendMessage = {
	type: MessageOutput,
	args: MessageInput,
	resolve: async (context, args) => {
		let newMessage = await messages
			.create({ ...args })
			.then(async (sucObj) => {
				let sss = await sucObj
					.populate('fromId')
					.populate('toId')
					.execPopulate();
				let newRead = new Date(sss.createdAt);

				singleChat.findOneAndUpdate(
					{
						forId: sss.fromId.id,
						withId: sss.toId.id
					},
					{
						forId: sss.fromId.id,
						withId: sss.toId.id,
						lastRead: newRead.getTime()
					},
					{ upsert: true },
					(err, doc) => {}
				);
				return sss;
			})
			.catch((errObj) => {
				console.log('err', errObj);
			});
		return newMessage;
	}
};

const updateLastRead = {
	type: ChatHead,
	args: UpdateUnreadCount,
	resolve: async (context, args) => {
		let dateNow = new Date();
		let chatHead = await singleChat
			.findOneAndUpdate(
				{
					forId: args.fromId,
					withId: args.toId
				},
				{
					lastRead: dateNow
				},
				{ upsert: true },
				(err, doc) => {
					return doc;
				}
			)
			.populate('forId')
			.populate('withId')
			.exec();

		return chatHead;
	}
};

module.exports = { sendMessage, updateLastRead };
