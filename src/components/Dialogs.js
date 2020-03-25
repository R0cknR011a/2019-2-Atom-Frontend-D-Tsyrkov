/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import styles from '../styles/chats.module.css';
import url from '../constants/backend';
import homeURL from '../constants/config';
import Centrifuge from 'centrifuge';


function Dialogs({ history, username, logout, avatar, centToken }) {
	const [chats, setChats] = useState([]);
	const [toggleAdd, setAdd] = useState(false);
	const [menu, setMenu] = useState(false);
	const [usersList, setUsersList] = useState([]);
	const [currentUsersList, setCurrentUsersList] = useState(null);

	const renderMenuItem = () => {
		return(
			<div className={styles.header_menu}>
				<div onClick={() => history.push(`${homeURL}/settings`)} role='button' tabIndex={0} onKeyPress={() => {}}>Settings</div>
				<div onClick={() => logout()} role='button' tabIndex={0} onKeyPress={() => {}}>Logout</div>
			</div>
		);
	}

	const renderAddInputMenu = () => {
		return(
			<div>
				<div className={styles.user_list}>
					{renderUserList()}
				</div>
				<input
					className={styles.add_input}
					type="text"
					onChange={(event) => HandleChange(event)}
				/>
			</div>
		);
	}

	const renderChats = () => {
		return chats.map((element, index) => {
			return(
				<DialogContainer
					key={index}
					name={element.opponent}
					date={element.date ? element.date.split('T')[1].slice(0, 5) : ''}
					check={element.read}
					goToChat={() => history.push(`${homeURL}/chatWith/${element.opponent}`)}
					message={element.last_message}
					avatar={element.avatar}
					author={element.author}
					username={username}/>
			);
		})
	}

	useEffect(() => {
		fetch(`${url}/chats/get_all/?username=${username}`, {
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			},
		}).then(res => {
			if (res.ok) {
				res.json().then((json) => {
					const result = [];
					json.result.forEach(element => {
						if (element.date !== '') {
							result.push(element);
						}
					})
					setChats(result);					
				});
			} else if (res.status === 401) {
				logout();
			}
		});
	}, [logout, username]);

	const HandleChange = (event) => {
		const value = event.target.value;
		setCurrentUsersList(usersList => {
			let result = [];
			usersList.forEach(element => {
				if (element.slice(0, value.length) === value) {
					result.push(element);
				}
			});
			return result;
		});
		// const list = [];
		// usersList.forEach((element) => {
			// if (element.props.children.slice(0, event.target.value.length) === event.target.value) {
			// 	list.push(element);
			// }
		// });
	};

	const addChat = (opponent) => {
		console.log(opponent, chats);
		const data = new FormData();
		data.append('username', username);
		data.append('opponent', opponent);
		fetch(`${url}/chats/create/`, {
			method: 'POST',
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			},
			body: data,
		}).then(res => {
			if (res.ok) {
				res.json().then((json) => {
					console.log(json);
					setChats([
						...chats,
						json
					]);
				});
			} else if (res.status ===401) {
				logout();
			}
		});
	};

	const renderUserList = () => {
		return currentUsersList.map((element, index) => {
			return(
				<div
					role='button'
					tabIndex={0}
					onKeyPress={() => {}}
					className={styles.user}
					key={index}
					onClick={() => {
						setAdd(false);
						setCurrentUsersList(usersList);
						addChat(element);
					}}>{element}</div>
			);
		});
	}
			
	useEffect(() => {
		fetch(`${url}/users/get_all/?username=${username}`, {
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			}
		}).then(res => {
			if (res.ok) {
				res.json().then(json => {
					setUsersList(json.users);
					setCurrentUsersList(json.users);
				});
			} else if (res.status === 401) {
				logout();
			}
		});
	}, [logout, username]);

	useEffect(() => {
		let cent = new Centrifuge('ws://localhost:9000/connection/websocket');
		cent.setToken(centToken);
		cent.connect();
		cent.subscribe(username, message => {
			const result = chats.map((element) => {
				return element.opponent;
			});
			const change = result.indexOf(message.data.opponent);
			if (change === -1) {
				setChats([
					...chats,
					message.data
				]);
			} else {
				setChats(chats => {
					return chats.map((element, index) => {
						if (index === change) {
							element = message.data;
						}
						return element;
					})
				})
			}
		});
		cent.subscribe(`${username}_notify`, message => {
			console.log(chats, 'here!!!', message);
			setChats(chats => {
				return chats.map(element => {
					if (element.opponent === message.data.opponent) {
						element.read = true;
					}
					return element;
				});
			});
		});
		return () => {
			cent.disconnect();
		}
	}, [username, centToken, chats]);

	// useEffect(() => {
	// 	let cent = new Centrifuge('ws://localhost:9000/connection/websocket');
	// 	cent.setToken(centToken);
	// 	cent.connect();
	// 	cent.subscribe(`${username}_notify`, message => {
	// 		console.log(chats, 'here!!!', message);
	// 		setChats(chats => {
	// 			return chats.map(element => {
	// 				if (element.opponent === message.data.opponent) {
	// 					element.read = true;
	// 				}
	// 				return element;
	// 			});
	// 		});
	// 	});
	// 	return () => {
	// 		cent.disconnect();
	// 	}
	// }, [chats, username, centToken]);

	return (
		<div className={styles.dialog_form}>
			<div className={styles.dialog_header}>
				<div onClick={() => setMenu(!menu)} role="button" tabIndex={0} onKeyPress={() => {}} className={styles.menu_button}>&#9776;</div>
				<div className={styles.header_text}>{username}</div>
			</div>
			{menu ? renderMenuItem() : null}
			<div className={styles.chat_list}>{renderChats()}</div>
			<div className={styles.add_button} onClick={() => setAdd(!toggleAdd)} role="button" tabIndex={0} onKeyPress={() => {}}>
				&#x2b;
			</div>
			{toggleAdd ? renderAddInputMenu() : null}
		</div>
	);
}

function DialogContainer({ avatar, name, message, date, check, goToChat, author, username }) {
	return (
		<div className={styles.dialog_container} onClick={() => goToChat()} role='button' tabIndex={0} onKeyPress={() => {}}>
			<div className={styles.dialog_avatar}>
				<img
					src={avatar}
					className={styles.avatar_img}
					alt=''
				/>
			</div>
			<div>
				<div className={styles.dialog_name}>{name}</div>
				<div className={styles.dialog_message}>
					{author === username ? `(me): ${message}` : message}</div>
			</div>
			<div>
				<div className={styles.dialog_date}>{date}</div>
				{check ? (
					<div className={styles.dialog_check}>&#10004;</div>
				) : null}
			</div>
		</div>
	);
}

DialogContainer.defaultProps = {
	message: '',
	date: '',
	check: false,
};

DialogContainer.propTypes = {
	name: PropTypes.string.isRequired,
	message: PropTypes.string,
	date: PropTypes.string,
	check: PropTypes.bool,
	avatar: PropTypes.string.isRequired,
	goToChat: PropTypes.func.isRequired,
	author: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};

Dialogs.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	username: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired,
};

export default withRouter(Dialogs);
