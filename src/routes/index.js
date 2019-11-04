import React, { useState } from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from '@emotion/styled';
import Dialogs from '../components/Dialogs';
import Chat from '../components/Chat';

const Container = styled.div`
	background-color: rgb(20, 20, 20);
	height: 100vh;
	overflow: auto;
`;
export const history = createBrowserHistory();

function Routes(props) {
	const [component, setComponent] = useState(
		<Dialogs redirect={(name) => enterChat(name)} />,
	);

	const enterChat = (name) => {
		setComponent(<Chat redirect={() => exitChat()} name={name} />);
	};

	const exitChat = () => {
		setComponent(<Dialogs redirect={(name) => enterChat(name)} />);
	};

	return (
		<Router history={history}>
			<Container>
				<Switch>
					{component}
				</Switch>
			</Container>
		</Router>
	);
}

export default Routes;
