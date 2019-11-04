/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styles from '../styles/dialog-form.module.css';

function Dialogs(props) {
	const [chats, setChats] = useState([]);
	const [toggleAdd, setAdd] = useState(false);

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
						redirect={(name) => props.redirect(name)}
					/>,
				);
			});
			setChats(list);
		}
	}, []);

	const addToggle = () => {
		setAdd(!toggleAdd);
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
						redirect={(name) => props.redirect(name)}
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
				<div>&#128270;</div>
			</div>
			<div className={styles.chat_list}>{chats}</div>
			<button className={styles.add_button} onClick={() => addToggle()}>
				&#9998;
			</button>
			{toggleAdd ? (
				<AddInput redirect={(name) => props.redirect(name)} />
			) : null}
		</div>
	);
}

function DialogContainer(props) {
	return (
		<div
			className={styles.dialog_container}
			onClick={() => props.redirect(props.name)}
		>
			<div className={styles.dialog_avatar}>
				<img
					src="https://icon-library.net//images/free-profile-icon/free-profile-icon-4.jpg"
					className={styles.avatar_img}
				/>
			</div>
			<div>
				<div className={styles.dialog_name}>{props.name}</div>
				<div className={styles.dialog_message}>{props.message}</div>
			</div>
			<div>
				<div className={styles.dialog_date}>{props.date}</div>
				{props.check ? (
					<div className={styles.dialog_check}>&#10004;</div>
				) : null}
			</div>
		</div>
	);
}

export default Dialogs;
