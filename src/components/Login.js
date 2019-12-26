import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from '../styles/login.module.css';
import homeURL from '../constants/config';

function Login({ history, login }) {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsername = (event) => {
		setUsername(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={(event) => {
				event.preventDefault();
				login(username, password);
			}} className={styles.login_form}>
				<input type='text' placeholder='USERNAME' onChange={(event) => handleUsername(event)} className={styles.input} />
				<input type='password' placeholder='PASSWORD' onChange={(event) => handlePassword(event)} className={styles.input} />
				<button type='submit' className={styles.submit}>SUBMIT</button>
			</form>
			<div
				onClick={() => history.push(`${homeURL}/auth`)}
				className={styles.to_auth}
				tabIndex={0}
				role='button'
				onKeyPress={() => {}}>Do not have an account yet?</div>
		</div>
	);
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
};

export default withRouter(Login);
