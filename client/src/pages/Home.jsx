import { useContext, useEffect, useState } from 'react';
import Login from '../components/login/Login';
import { AuthContext } from '../lib/contexts/Auth.context';
import { useNavigate } from 'react-router-dom';
import Register from '../components/register/Register';

const Home = () => {
	const [isLogin, setIsLogin] = useState(true);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/chat');
	});

	return (
		<>
			<h1>HOME</h1>
			{isLogin ? (
				<Login setIsLogin={setIsLogin} />
			) : (
				<Register setIsLogin={setIsLogin} />
			)}
		</>
	);
};

export default Home;
