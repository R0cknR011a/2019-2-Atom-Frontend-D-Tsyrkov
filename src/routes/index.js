import React, { useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from '@emotion/styled';
import Dialogs from '../components/Dialogs';
import Chat from '../components/Chat';
import Settings from '../components/Settings';

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
					<Route exact path="/">
						{component}
					</Route>
					<Route path="/settings">
						<Settings />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
}

export default Routes;
