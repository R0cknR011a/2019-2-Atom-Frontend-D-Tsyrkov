import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/message-form.module.css';

function Chat(props) {
	const [messages, setMessages] = useState([]);
	const myRef = useRef(null);
	
	const scrollToBottom = () => {
		myRef.current.scrollIntoView({block: 'end'});
	}

	useEffect(scrollToBottom, [messages]);

	useEffect(() => {
		let list = [];
		JSON.parse(localStorage.getItem(props.name)).map((element) => {
			list.push(
				<div key={list.length} className={styles.message_container}>
					<div>{element[0]}</div>
					<div>{element[1]}</div>
				</div>,
			);
		});
		setMessages(list);
	}, []);

	function MessageInput(props) {
		const [current_message, setCurrentMessage] = useState('');
		const input = useRef(null);

		const handleChange = (event) => {
			setCurrentMessage(event.target.value);
		};

		const inputFocus = () => {
			input.current.focus();
		}

		useEffect(inputFocus, [input]);

		const sendMessage = (event, value) => {
			event.preventDefault();
			if (value !== '') {
				const date = new Date();
				const data = JSON.parse(localStorage.getItem(props.name));
				let minutes = date.getMinutes().toString();
				if (minutes.length === 1) {
					minutes = '0' + minutes;
				}
				let hours = date.getHours();
				if (hours.length === 1) {
					hours = '0' + hours;
				}
				setMessages([
					...messages,
					<div className={styles.message_container} key={data.length}>
						<div>{value}</div>
						<div>{hours + ':' + minutes}</div>
					</div>,
				]);

				data.push([value, hours + ':' + minutes]);
				localStorage.setItem(props.name, JSON.stringify(data));
			}
		};

		return (
			<form onSubmit={(event) => sendMessage(event, current_message.trim())}>
				<input
					type="text"
					onChange={(event) => handleChange(event)}
					className={styles.message_input}
					ref={input}
				/>
			</form>
		);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.chat_header}>
				<div
					className={styles.chat_exit_button}
					onClick={() => props.redirect()}
				>
					&#8678;
				</div>
				<div className={styles.chat_name}>{props.name}</div>
			</div>
			<div className={styles.messages_list} ref={myRef}>{messages}</div>
			<MessageInput name={props.name} />
		</div>
	);
}

export default Chat
