import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/settings-form.module.css';

function Settings() {
	const [fullname, setFullname] = useState('');
	const [username, setUsername] = useState('@');
	const [bio, setBio] = useState('');

	useEffect(() => {
		let data = localStorage.getItem('settings');
		if (data === null) {
			localStorage.setItem('settings', JSON.stringify({
				'fullname': '',
				'username': '@',
				'bio': ''
			}));
		} else {
			data = JSON.parse(data);
			setFullname(data.fullname);
			setUsername(data.username);
			setBio(data.bio);
		}
	}, []);

	const handleFullname = (event) => {
		setFullname(event.target.value);
	};

	const handleUsername = (event) => {
		setUsername(event.target.value);
	};

	const handleBio = (event) => {
		setBio(event.target.value);
	};

	const handleSubmit = () => {
		let user = username;
		if (username.charAt(0) !== '@') {
			user = `@${  username}`;
		}
		const data = {
			'fullname': fullname,
			'username': user,
			'bio': bio
		};
		localStorage.setItem('settings', JSON.stringify(data));
		setUsername(user);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Link to="/" >
					<div className={styles.exit}>&#8678;</div>
				</Link>
				<div className={styles.header_settings}>Settings</div>
				<div className={styles.header_save} onClick={() => handleSubmit()} role="button" tabIndex={0} onKeyPress={() => {}}>&#10004;</div>
			</div>
			<form className={styles.main_form}>
				<div className={styles.main_avatar}>
					<img
						src="https://icon-library.net//images/free-profile-icon/free-profile-icon-4.jpg"
						className={styles.avatar_img}
						alt=''
					/>
				</div>
				<div className={styles.form_fullname}>
					Full Name
					<br />
					<input type="text" className={styles.fullname_input} onChange={(event) => handleFullname(event)} value={fullname}/>
				</div>
				This affects only your profile name
				<div className={styles.form_username}>
					User Name
					<br />
					<input type="text" className={styles.username_input} onChange={(event) => handleUsername(event)} value={username}/>
				</div>
				Enter your chat name (4 characters at least)
				<div className={styles.form_bio}>
					Bio
					<br />
					<textarea className={styles.bio_input} onChange={(event) => handleBio(event)} value={bio}/>
				</div>
				Any details about you
			</form>
		</div>
	);
}

export default Settings;
