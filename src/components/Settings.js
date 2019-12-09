import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/settings.module.css';
import url from '../constants/backend';

function Settings({ history, username, logout }) {
	const [name, setName] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [bio, setBio] = useState(null);

	const FileInputRef = useRef(null);

	useEffect(() => {
		fetch(`${url}/users/get_settings/?username=${username}`, {
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`
			},
		}).then(res => {
			if (res.ok) {
				res.json().then(json => {
					setAvatar(json.result.avatar);
					setBio(json.result.bio);
					setName(json.result.fullname);
				});
			} else if (res.status === 401) {
				logout();
			}
		});
	}, []);

	const loadAvatar = (file) => {
		const data = new FormData();
		data.append('username', username);
		data.append('avatar', file[0]);
		fetch(`${url}/users/set_avatar/`, {
			method: 'POST',
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`
			},
			body: data,
		}).then(res => {
			if (res.ok) {
				const fileURL = window.URL.createObjectURL(file[0]);
				setAvatar(fileURL);
			} else if (res.status === 401) {
				logout();
			}
		});
	};

	const handleUsername = (event) => {
		setName(event.target.value);
	};

	const handleBio = (event) => {
		setBio(event.target.value);
	};

	const handleSubmit = () => {
		if (name.split(' ').length !== 2) {
			alert('Please enter your first name and last name');
		} else {
			const data = new FormData();
			data.append('fullname', name);
			data.append('bio', bio);
			data.append('username', username);
			fetch(`${url}/users/set_settings/`, {
				method: 'POST',
				headers: {
					'Authorization': `JWT ${localStorage.getItem('token')}`,
				},
				body: data,
			}).then(res => {
				if (res.status === 401) {
					logout();
				}
			});
		};
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div onClick={() => history.push(`${process.env.PUBLIC_URL}/`)} role="button" tabIndex={0} onKeyPress={() => {}} className={styles.exit}>&#8678;</div>
				<div className={styles.header_settings}>Settings</div>
				<div className={styles.header_save} onClick={() => handleSubmit()} role="button" tabIndex={0} onKeyPress={() => {}}>&#10004;</div>
			</div>
			<form className={styles.main_form}>
				<div className={styles.main_avatar} tabIndex={0} role='button' onKeyPress={() => {}} onClick={() => FileInputRef.current.click()}>
					<input type='file' accept='image/*' style={{'display': 'none'}}
						ref={FileInputRef} onChange={(event) => loadAvatar(event.target.files)}/>
					<img
						src={avatar}
						className={styles.avatar_img}
						alt=''
					/>
				</div>
				<div className={styles.form_username}>
					Full Name
					<br />
					<input type="text" className={styles.username_input} onChange={(event) => handleUsername(event)} value={name}/>
				</div>
				Enter your full name
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

Settings.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
	username: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired,
};

export default withRouter(Settings);
