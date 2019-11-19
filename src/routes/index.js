import React from 'react';
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
	return (
		<Router history={history}>
			<Container>
				<Switch>
					<Route exact path="/" component={Dialogs} />
					<Route path="/settings" component={Settings} />
					<Route path="/chatWith/:name" component={Chat} />
				</Switch>
			</Container>
		</Router>
	);
}

export default Routes;
