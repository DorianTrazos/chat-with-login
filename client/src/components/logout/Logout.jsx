import { useContext, useEffect } from 'react';
import { AuthContext } from '../../lib/contexts/Auth.context';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/config/firebase.config';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) navigate('/');
	});

	return user && <button onClick={() => logout(navigate)}>Sign Out</button>;
};

export default Logout;

const logout = async navigate => {
	await signOut(auth);
	navigate('/');
};
