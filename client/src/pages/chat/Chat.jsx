import { useContext, useEffect, useState } from 'react';
import Logout from '../../components/logout/Logout';
import Messages from '../../components/messages/Messages';
import socket from '../../lib/config/socket.config';
import { AuthContext } from '../../lib/contexts/Auth.context';

const Chat = () => {
	const { user, loading } = useContext(AuthContext);
	const [usersConnected, setUsersConnected] = useState([]);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (!user) return;
		socket.emit('user-connected', { email: user.email });

		return () => {
			socket.emit('user-disconnected', { email: user.email });
		};
	}, [user]);

	useEffect(() => {
		socket.on('server-message', data => {
			console.log('New message received:', data);

			const updatedMessages = [...messages, data];
			setMessages(updatedMessages);

			//Si llegan dos mensajes muy rápidos, esto fallará
			// La solución ideal es utilizar un reducer, la otra solución es utilizar la sintaxis de función de setMessages(prev => [...prev, data]); Explicar mañana

			// setMessages(prevData => [...prevData, data]);
		});

		socket.on('users-updated', data => {
			console.log(data);
			setUsersConnected(data);

			//Si llegan dos mensajes muy rápidos, esto fallará
			// La solución ideal es utilizar un reducer, la otra solución es utilizar la sintaxis de función de setMessages(prev => [...prev, data]); Explicar mañana

			// setMessages(prevData => [...prevData, data]);
		});

		return () => {
			socket.off('server-message');
			socket.off('users-updated');
		};
	}, [messages, user]);

	if (loading) return <h2>Loading...</h2>;
	// console.log(user);

	return (
		<>
			<h1>CHAT</h1>
			<Logout />
			{usersConnected.map(user => (
				<p key={user}>{user}</p>
			))}
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
