import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Router from './lib/router/Router';
import AuthProvider from './lib/providers/AuthProvider';
import { useEffect, useState } from 'react';

const printHeight = event => {
	console.dir(event.target.clientHeight);
};

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<AuthProvider>
				<Router />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
