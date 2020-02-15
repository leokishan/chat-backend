const io = require('socket.io');

const initSocket = () => {
	const socket = new io(8086, {
		path: '/graphSocket',
		serveClient: false
	});
	return socket;
};

const getSocket = () => {
	const connection = initSocket();
	connection.on('connect', socketOps);
};

const socketOps = (socket) => {
	socket.on('joinRoom', (data) => {
		socket.join(data);
	});
	socket.on('leaveRoom', (data) => {
		socket.leave(data);
	});

	socket.on('sendNewMessage', (data) => {
		socket.broadcast.to(data.room).emit('recievedChatMessage', data.data);
		socket.to('allChat').emit('checkGeneralMessage', data.data);
	});
};

module.exports = getSocket;
