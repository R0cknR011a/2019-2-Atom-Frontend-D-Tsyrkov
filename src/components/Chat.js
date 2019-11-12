import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/message-form.module.css';


function Chat({ match, history }) {
	const [messages, setMessages] = useState([]);
	const myRef = useRef(null);
	const {name} = match.params;
	
	const scrollToBottom = () => {
		myRef.current.scrollIntoView({block: 'end'});
	};

	useEffect(scrollToBottom, [messages]);

	useEffect(() => {
		const list = [];
		JSON.parse(localStorage.getItem(name)).map((element) => {
			list.push(
				<div key={list.length} className={styles.message_container}>
					<div>{element[0]}</div>
					<div>{element[1]}</div>
				</div>,
			);
			return 0;
		});
		setMessages(list);
	}, []);

	function MessageInput() {
		const [currentMessage, setCurrentMessage] = useState('');
		const input = useRef(null);

		const handleChange = (event) => {
			setCurrentMessage(event.target.value);
		};

		const inputFocus = () => {
			input.current.focus();
		};

		useEffect(inputFocus, [input]);

		const sendMessage = (event, value) => {
			event.preventDefault();
			if (value !== '') {
				const date = new Date();
				const data = JSON.parse(localStorage.getItem(name));
				let minutes = date.getMinutes().toString();
				if (minutes.length === 1) {
					minutes = `0${  minutes}`;
				}
				let hours = date.getHours().toString();
				if (hours.length === 1) {
					hours = `0${  hours}`;
				}
				setMessages([
					...messages,
					<div className={styles.message_container} key={data.length}>
						<div>{value}</div>
						<div>{`${hours  }:${  minutes}`}</div>
					</div>,
				]);

				data.push([value, `${hours  }:${  minutes}`]);
				localStorage.setItem(name, JSON.stringify(data));
			}
		};

		return (
			<form onSubmit={(event) => sendMessage(event, currentMessage.trim())}>
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
				<div role="button" tabIndex={0}
					className={styles.chat_exit_button}
					onKeyPress={() => {}}
					onClick={() => history.push('/')}
				>
					&#8678;
				</div>
				<div className={styles.chat_name}>{name}</div>
			</div>
			<div className={styles.messages_list} ref={myRef}>{messages}</div>
			<MessageInput name={name} />
		</div>
	);
}

Chat.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			name: PropTypes.string.isRequired
		})
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
};

export default withRouter(Chat);
