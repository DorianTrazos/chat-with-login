const Messages = ({ messages }) => {
	return (
		<div>
			{messages.map(msg => (
				<p key={msg.id}>
					<span>{msg.date} - </span>
					<strong>{msg.user}</strong>: {msg.text}
				</p>
			))}
		</div>
	);
};

export default Messages;
