import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Chat from '../../pages/chat/Chat';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/chat' element={<Chat />} />
		</Routes>
	);
};

export default Router;
