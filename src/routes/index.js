import React, { useState, useEffect }from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dialogs from '../components/Dialogs';
import Chat from '../components/Chat';
import Auth from '../components/Auth';
import Login from '../components/Login';
import Settings from '../components/Settings';
import url from '../constants/backend';


function Routes() {

	const [username, setUsername] = useState('');
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
					}).then(res => {
						if (res.ok) {
							fetch(`${url}/core/current_user/`, {
								headers: {
									'Authorization': `JWT ${token}`,
								},
							}).then(res => res.json()).then(json => {
								setUsername(json.username);
								setAuth(true);
							})
						} else {
							alert('Server error')
						}
					})
				} else {
					setAuth(false);
				}
			})
		}
	}, [])

	const handleLogin = (username, password) => {
		const data = {
			'username': username,
			'password': password,
		}
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
					setUsername(json.user.username);
					setAuth(true);
				})
			} else {
				setAuth(false);
				alert('Username or password is invalid');
			}
		})
	}

	const handleAuth = (username, email, password, repeatPassword) => {
		if (password === repeatPassword) {
			const data = {
				'username': username,
				'email': email,
				'password': password,
			}
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
						setUsername(json.username);
						setAuth(true);
					})
				} else {
					alert('Username already exists')
				}
			})
		} else {
			alert('Passwords doesn\'t match')
		}
	}

	const handleLogout = () => {
		localStorage.removeItem('token');
		setAuth(false);
	}

	return (
		<Router>
			{auth ? (
				<Switch>
					<Route path="/settings" render={(props) => <Settings {...props} username={username} logout={handleLogout} /> } />
					<Route path="/chatWith/:name" render={(props) => <Chat {...props} username={username} logout={handleLogout} /> } />
					<Route render={(props) => <Dialogs {...props} username={username} logout={handleLogout} />} />
				</Switch>
			) : (
				<Switch>
					<Route path="/auth" render={(props) => <Auth {...props} handleAuth={handleAuth} />} />
					<Route render={(props) => <Login {...props} login={handleLogin} />} />
				</Switch>
			)}
		</Router>
	);
}



export default Routes;
