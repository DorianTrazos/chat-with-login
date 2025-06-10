import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/login/Login';
import Register from '../../components/register/Register';
import { AuthContext } from '../../lib/contexts/Auth.context';

const Home = () => {
	const [isLogin, setIsLogin] = useState(true);
	const { user, loading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate('/chat');
	}, [navigate, user]);

	if (loading) return <h2>Loading...</h2>;

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
