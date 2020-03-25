import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dialogs from './components/Dialogs';
import Chat from './components/Chat';
import Login from './components/Login';
import Settings from './components/Settings';
import GroupChat from './components/GroupChat';
import Auth from './components/Auth';
import url from './constants/backend';


function Routes() {

	const [username, setUsername] = useState('');
	const [avatar, setAvatar] = useState('');
	const [centToken, setCentToken] = useState('');
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token === null) {
			setAuth(false);
		} else {
			fetch(`${url}/api-token-verify/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'token': token
				}),
			}).then(res => {
				if (res.ok) {
					fetch(`${url}/api-token-refresh/`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							'token': token
						}),
					}).then(resp => {
						if (resp.ok) {
							fetch(`${url}/core/current_user/`, {
								headers: {
									'Authorization': `JWT ${token}`,
								},
							}).then(response => response.json()).then(json => {
								setCentToken(json.cent_token);
								setAvatar(json.url);
								setUsername(json.username);
								setAuth(true);
							});
						} else {
							alert('Server error');
						}
					});
				} else {
					setAuth(false);
				}
			});
		}
	}, []);

	const handleLogin = (user, password) => {
		const data = {
			'username': user,
			'password': password,
		};
		fetch(`${url}/token-auth/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then(res => {
			if (res.ok) {
				res.json().then(json => {
					localStorage.setItem('token', json.token);
					setCentToken(json.cent_token);
					setUsername(json.user.username);
					setAvatar(json.user.url);
					setAuth(true);
				});
			} else {
				setAuth(false);
				alert('Username or password is invalid');
			}
		});
	};

	const handleAuth = (user, email, password, repeatPassword) => {
		if (password === repeatPassword) {
			const data = {
				'username': user,
				'email': email,
				'password': password,
			};
			fetch(`${url}/core/users/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(res => {
				if (res.ok) {
					res.json().then(json => {
						localStorage.setItem('token', json.token);
						setCentToken(json.cent_token);
						setAvatar(json.url);
						setUsername(json.username);
						setAuth(true);
					});
				} else {
					alert('Username already exists');
				}
			});
		} else {
			alert('Passwords doesn\'t match');
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setAuth(false);
	};

	return (
		<Router>
			{auth ? (
				<Switch>
					<Route path="/settings" render={(props) => <Settings centToken={centToken} username={username} avatar={avatar} logout={handleLogout} /> } />
					<Route path="/chatWith/:name" render={(props) => <Chat centToken={centToken} username={username} avatar={avatar} logout={handleLogout} /> } />
					<Route path="/group_chat" render={(props) => <GroupChat centToken={centToken} username={username} avatar={avatar} logout={handleLogout} /> } />
					<Route render={(props) => <Dialogs username={username} centToken={centToken} avatar={avatar} logout={handleLogout} />} />
				</Switch>
			) : (
				<Switch>
					<Route path="/auth" render={(props) => <Auth handleAuth={handleAuth} />} />
					<Route render={(props) => <Login login={handleLogin} />} />
				</Switch>
			)}
		</Router>
	);
}



export default Routes;
