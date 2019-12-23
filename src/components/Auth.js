import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from '../styles/auth.module.css';
import homeURL from '../constants/config';


function Auth({ history, handleAuth }) {

	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const handleUsername = (event) => {
		setUserName(event.target.value);
	};

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const handleRepeatPassword = (event) => {
		setRepeatPassword(event.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<form onSubmit={(event) => {
				event.preventDefault();
				handleAuth(username, email, password, repeatPassword);
			}} className={styles.auth_form}>
				<input type='text' placeholder='USERNAME' className={styles.input} maxLength={20} onChange={(event) => handleUsername(event)} />
				<input type='email' placeholder='EMAIL' className={styles.input} maxLength={20} onChange={(event) => handleEmail(event)} />
				<input type='password' placeholder='PASSWORD' className={styles.input} maxLength={16} onChange={(event) => handlePassword(event)} />
				<input type='password' placeholder='REPEAT PASSWORD' className={styles.input} maxLength={16} onChange={(event) => handleRepeatPassword(event)} />
				<button type='submit' className={styles.submit}>SUBMIT</button>
			</form>
			<div role="button" onClick={() => history.push(`${homeURL}/login`)} className={styles.to_login} tabIndex={0} onKeyPress={() => {}} >Do you have an account?</div>
		</div>
	);
}

Auth.propTypes = {
	handleAuth: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
};

export default withRouter(Auth);
