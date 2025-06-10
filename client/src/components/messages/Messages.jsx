const Messages = ({ messages }) => {
	return (
		<div>
			{messages.map(msg => (
				<p key={msg.id}>
					<strong>{msg.user}</strong>: {msg.text}
				</p>
			))}
		</div>
	);
};

export default Messages;
