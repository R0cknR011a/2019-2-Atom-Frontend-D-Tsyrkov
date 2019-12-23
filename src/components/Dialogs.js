import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/chats.module.css';
import url from '../constants/backend';
import homeURL from '../constants/config';


function Dialogs({ history, username, logout }) {
	const [chats, setChats] = useState([]);
	const [toggleAdd, setAdd] = useState(false);
	const [menu, setMenu] = useState(false);
	const [usersList, setUsersList] = useState(null);
	const [currentUsersList, setCurrentUsersList] = useState(null);

	const menuItem =
		<div className={styles.header_menu}>
			<div onClick={() => history.push(`${homeURL}/settings`)} role='button' tabIndex={0} onKeyPress={() => {}}>Settings</div>
			<div onClick={() => logout()} role='button' tabIndex={0} onKeyPress={() => {}}>Logout</div>
		</div>;

	const addInputMenu =
		<div>
			<div className={styles.user_list}>
				{currentUsersList}
			</div>
			<input
				className={styles.add_input}
				type="text"
				onChange={(event) => HandleChange(event)}
			/>
		</div>;

	const loadChats = useCallback(() => {
		fetch(`${url}/chats/get_all/?username=${username}`, {
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			},
		}).then(res => {
			if (res.ok) {
				res.json().then((json) => {
					const list = json.result.map((element) => {
						return (<DialogContainer
							key={list.length}
							name={element.opponent}
							date={element.date ? element.date.split('T')[1].slice(0, 5) : ''}
							check={element.read}
							goToChat={() =>history.push(`${homeURL}/chatWith/${element.opponent}`)}
							message={element.last_message} 
							avatar={element.avatar}
							author={element.author}
							username={username}/>);
					});
					setChats(list);
				});
			} else if (res.status === 401) {
				logout();
			}
		});
	}, [history, logout, username]);

	function useInterval(callback, delay) {
		const savedCallback = useRef();
	
		useEffect(() => {
			savedCallback.current = callback;
		}, [callback]);

		useEffect(() => {
			function tick() {
				savedCallback.current();
			}
			if (delay !== null) {
				const id = setInterval(tick, delay);
				return () => clearInterval(id);
			}
			return 0;
		}, [delay]);
	}

	const HandleChange = (event) => {
		const list = [];
		usersList.forEach((element) => {
			if (element.props.children.slice(0, event.target.value.length) === event.target.value) {
				list.push(element);
			}
		});
		setCurrentUsersList(list);
	};

	const addChat = (opponent) => {
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
					setChats([
						...chats,
						<DialogContainer
							key={chats.length}
							avatar={json.avatar}
							name={opponent}
							date=""
							check={false}
							author='1'
							username={username}
							goToChat={() => history.push(`${homeURL}/`)}/>
					]);
				});
			} else if (res.status ===401) {
				logout();
			}
		});
	};

	const loadPotentialChats = () => {
		fetch(`${url}/users/get_all/?username=${username}`, {
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`,
			}
		}).then(res => {
			if (res.ok) {
				res.json().then(json => {
					const list = [];
					json.users.map((element) => {
						list.push(
							<div
								role='button'
								tabIndex={0}
								onKeyPress={() => {}}
								className={styles.user}
								key={list.length}
								onClick={() => {
									setAdd(false);
									addChat(element);
								}}>{element}</div>
						);
						return 0;
					});
					setUsersList(list);
					setCurrentUsersList(list);
				});
			} else if (res.status === 401) {
				logout();
			}
		});
	};

	useEffect(() => {
		loadChats();
	}, [loadChats]);

	useInterval(loadChats, 5000);

	return (
		<div className={styles.dialog_form}>
			<div className={styles.dialog_header}>
				<div onClick={() => setMenu(!menu)} role="button" tabIndex={0} onKeyPress={() => {}} className={styles.menu_button}>&#9776;</div>
				<div className={styles.header_text}>{username}</div>
			</div>
			{menu ? menuItem : null}
			<div className={styles.chat_list}>{chats}</div>
			<div className={styles.add_button} onClick={() => {
				setAdd(!toggleAdd);
				if (!toggleAdd) {
					loadPotentialChats();
				}
			}} role="button" tabIndex={0} onKeyPress={() => {}}>
				&#x2b;
			</div>
			{toggleAdd ? (
				addInputMenu
			) : null}
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

export default Dialogs;
