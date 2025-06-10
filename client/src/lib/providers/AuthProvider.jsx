import { useEffect, useState } from 'react';

import { auth } from '../config/firebase.config';
import { AuthContext } from '../contexts/Auth.context';

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged(user => {
			setLoading(true);
			if (user) {
				console.log(user);
				setUser(user);
			} else {
				console.log('No user');
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsuscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
