import { useContext, useEffect, useState } from 'react';
import Logout from '../../components/logout/Logout';
import Messages from '../../components/messages/Messages';
import socket from '../../lib/config/socket.config';
import { AuthContext } from '../../lib/contexts/Auth.context';

const Chat = () => {
	const { user, loading } = useContext(AuthContext);

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('server-message', data => {
			const updatedMessages = [...messages, data];
			setMessages(updatedMessages);
		});

		return () => socket.off('server-message');
	}, [messages, user]);

	if (loading) return <h2>Loading...</h2>;
	console.log(user);

	return (
		<>
			<h1>CHAT</h1>
			<Logout />
			<Messages messages={messages} />
			<form onSubmit={event => sendMessage(event, user)}>
				<input placeholder='Type a message...' name='message' />
				<button>Send</button>
			</form>
		</>
	);
};

const sendMessage = (event, user) => {
	event.preventDefault();
	const message = event.target.message.value;
	socket.emit('client-message', { message, user: user.email });
	event.target.reset();
};

export default Chat;
