import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/dialog-form.module.css';


function Dialogs({ redirect }) {
	const [chats, setChats] = useState([]);
	const [toggleAdd, setAdd] = useState(false);
	const [menu, setMenu] = useState(false);

	useEffect(() => {
		const data = localStorage.getItem('users');
		if (data === null) {
			localStorage.setItem('users', JSON.stringify([]));
		} else {
			const list = [];
			JSON.parse(data).map((element) => {
				const info = JSON.parse(localStorage.getItem(element)).pop();
				let message = '';
				let date = '';
				let check = false;
				if (info !== undefined) {
					[message, date] = info;
					check = true;
				}
				list.push(
					<DialogContainer
						name={element}
						date={date}
						message={message}
						check={check}
						key={list.length}
						redirect={(name) => redirect(name)}
					/>,
				);
				return 0;
			});
			setChats(list);
		}
	}, [redirect]);

	const addToggle = () => {
		setAdd(!toggleAdd);
	};

	const menuToggle = () => {
		setMenu(!menu);
	};

	function AddInput() {
		const [value, setValue] = useState('');

		const HandleSubmit = (event) => {
			event.preventDefault();
			if (value !== '') {
				const data = JSON.parse(localStorage.getItem('users'));
				setChats([
					...chats,
					<DialogContainer
						name={value}
						key={data.length}
						redirect={(name) => redirect(name)}
					/>,
				]);
				data.push(value);
				localStorage.setItem('users', JSON.stringify(data));
				localStorage.setItem(value, JSON.stringify([]));
			}
		};

		const HandleChange = (event) => {
			setValue(event.target.value);
		};

		return (
			<form onSubmit={(event) => HandleSubmit(event, value.trim())}>
				<input
					className={styles.add_input}
					type="text"
					onChange={(event) => HandleChange(event)}
				/>
			</form>
		);
	}

	return (
		<div className={styles.dialog_form}>
			<div className={styles.dialog_header}>
				<div>&#9776;</div>
				<div className={styles.header_text}>Messenger</div>
				<span role="img" aria-label="smth">&#128270;</span>
			</div>
			<div className={styles.chat_list}>{chats}</div>
			<button className={styles.add_button} onClick={() => addToggle()} type="button">
				&#9998;
			</button>
			{toggleAdd ? (
				<AddInput redirect={(name) => redirect(name)} />
			) : null}
		</div>
	);
}

function DialogContainer({ name, message, date, check, redirect }) {
	return (
		<div role="button" tabIndex={0}
			className={styles.dialog_container}
			onClick={() => redirect(name)}
			onKeyPress={() => {}}
		>
			<div className={styles.dialog_avatar}>
				<img
					src="https://icon-library.net//images/free-profile-icon/free-profile-icon-4.jpg"
					className={styles.avatar_img}
					alt=''
				/>
			</div>
			<div>
				<div className={styles.dialog_name}>{name}</div>
				<div className={styles.dialog_message}>{message}</div>
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

DialogContainer.propTypes = {
	name: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	check: PropTypes.bool.isRequired,
	redirect: PropTypes.func.isRequired,
};

Dialogs.propTypes = {
	redirect: PropTypes.func.isRequired,
};

export default Dialogs;
