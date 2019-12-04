import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from '../styles/login.module.css';

function Login({ history, login }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

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
            <h1 onClick={() => history.push(`${process.env.PUBLIC_URL}/auth`)} className={styles.to_auth}>Don't have an account yet?</h1>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
}

export default withRouter(Login);
