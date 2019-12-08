import React from 'react';
import { Router, Switch, Route, useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from '@emotion/styled';
import Dialogs from '../components/Dialogs';
import Chat from '../components/Chat';
import Settings from '../components/Settings';
import GroupChat from '../components/GroupChat';

const Container = styled.div`
  background-color: rgb(20, 20, 20);
  height: 100vh;
  overflow: auto;
`;
export const history = createBrowserHistory();

function ChatRouter() {
	const { name } = useParams();
	return (
		<Chat name={name}/>
	);
}

function Routes(props) {
	return (
		<Router history={history}>
			<Container>
				<Switch>
					<Route path="/settings">
						<Settings />
					</Route>
					<Route path="/chatWith/:name">
						<ChatRouter />
					</Route>
					<Route path="/">
						<Dialogs />
					</Route>
					<Route path="/group_chat">
						<GroupChat />
					</Route>
				</Switch>
			</Container>
		</Router>
	);
}

export default Routes;
