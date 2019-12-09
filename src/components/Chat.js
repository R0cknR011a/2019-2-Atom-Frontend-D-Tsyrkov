import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/messages.module.css';
import clip from './paper-clip-6-64.png';
import play from './play-icon-white-png-8.jpg';
import stop from './Stop-circle-01.svg';
import url from '../constants/backend';

function Chat({ match, history, username, logout }) {
	const { name } = match.params;

	const [messages, setMessages] = useState([]);
	// const [loading, setLoading] = useState(true);
	const [currentMessage, setCurrentMessage] = useState('');
	const [clipMenuToggle, setClip] = useState(false);
	const [attachments, setAttachments] = useState([]);
	const [recording, setRecording] = useState(null);
	const [recorder, setRecorder] = useState(null);
	const [chunks, setChunks] = useState([]);
	const [sendButton, setSendButton] = useState(null);
	const [files, setFiles] = useState(null);

	const chatBottom = useRef(null);
	const CurrMessageInput = useRef(null);
	const FileInputRef = useRef(null);

	const container = {
		mine: {
			'float': 'right'
		},
		not_mine: {
			'float': 'left'
		},
		read: {
			'backgroundColor': 'rgb(10, 10, 10)'
		},
		not_read: {
			'backgroundColor': 'rgb(30, 30, 30)'
		}
	};

	const attachMenu =
		<div className={styles.attach_menu}>
			<div className={styles.location}
				onClick={() => sendLocation()} role='button'
				tabIndex={0} onKeyPress={() => {}}>Location</div>
			<div className={styles.media} onClick={() => FileInputRef.current.click()}
				role='button' tabIndex={0} onKeyPress={() => {}}>Image</div>
			<input type="file" multiple accept="image/*" className={styles.attach_meni_idk} onChange={(event) => {
				setFiles(event.target.files);
				previewFiles(event.target.files);
			}} ref={FileInputRef} />
			<div className={styles.audio} onClick={(event) => recordHandler(event)} role='button' tabIndex={0} onKeyPress={() => {}}>
				Audio
				{recording ?
					<img src={stop} alt='stop' className={styles.play_stop}/>
					:
					<img src={play} alt='play' className={styles.play_stop}/>}
			</div>
		</div>;

	const previewFiles = (inputFiles) => {
		if (inputFiles.length > 10) {
			alert('There is a file limit of 10 maximum');
		} else {
			const fileListToAttachment = [];
			for (let i = 0; i < inputFiles.length; i+=1) {
				const fileURL = window.URL.createObjectURL(inputFiles[i]);
				fileListToAttachment.push(
					<div key={i} className={styles.attach_container}>
						<img
							src={fileURL}
							alt="img"
							className={styles.attach_img}
							onLoad={() => {
								window.URL.revokeObjectURL(fileURL);
							}} />
					</div>
				);
			};
			setAttachments(fileListToAttachment);
			setSendButton(
				<button
					className={styles.send_button}
					type="button"
					onClick={(event) => {
						sendMessage(event, currentMessage, inputFiles);
						setSendButton(false);
					}}
				>
					<img src={play} className={styles.send_button_img} alt="img"/>
				</button>
			);
		}
	};

	async function fetchData() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			return mediaRecorder;
		} catch(err) {
			return -1;
		}
	}

	const startRecord = (record) => {
		const recordHere = record;
		recordHere.start(10);
		recordHere.ondataavailable = (event) => {
			chunks.push(event.data);
		};
		setRecorder(recordHere);
		setRecording(true);
	};

	const stopRecord = () => {
		recorder.stop();
		const blob = new Blob(chunks, { type: recorder.mimeType });
		const data = new FormData();
		data.append('audio', blob);
		data.append('username', username);
		data.append('opponent', name);
		data.append('content', '');
		data.append('date', getTime());
		data.append('attach_type', 'audio');
		fetch(`${url}/messages/create/`, {
			method: 'POST',
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`
			},
			body: data,
		}).then(res => {
			if (res.ok) {
				const audioURL = window.URL.createObjectURL(blob);
				setMessages([
					...messages,
					<div style={container.not_read} key={messages.length}>
						<audio
							controls src={audioURL}
							className={styles.audio_output}
							style={container.mine}>
							<track kind="captions" srcLang="en" label="english_captions" />
						</audio>
					</div>
				]);
			} else if (res.status === 401) {
				logout();
			}
		});
		setRecording(false);
		setChunks([]);
	};

	const recordHandler = (event) => {
		event.preventDefault();
		if (recording === null) {
			fetchData().then((mediaRecorder) => startRecord(mediaRecorder));
		} else if (recording) {
			stopRecord();
		} else {
			startRecord(recorder);
		}
	};

	const sendLocation = () => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				const pos = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
				const data = new FormData();
				data.append('username', username);
				data.append('opponent', name);
				data.append('content', pos);
				data.append('date', getTime());
				data.append('attach_type', 'geolocation');
				fetch(`${url}/messages/create/`, {
					method: 'POST',
					headers: {
						'Authorization': `JWT ${localStorage.getItem('token')}`,
					},
					body: data,
				}).then(res => {
					if (res.ok) {
						setMessages([
							...messages,
							<div style={container.not_read} key={messages.length}>
								<div
									className={styles.message_container}
									style={container.mine}>
									<div>Ваше местоположение: <a href={pos}>{pos}</a></div>
									<div style={container.mine} className={styles.message_time}>{getTime().split(' ')[1]}</div>
								</div>
							</div>
						]);
					} else if (res.status === 401) {
						logout();
					}
				});
				
			});
		} else  {
			alert('Geolocation is not respond');
		}
	};

	const getTime = () => {
		let time = '';
		const date = new Date();
		let minutes = date.getMinutes().toString();
		if (minutes.length === 1) {
			minutes = `0${minutes}`;
		}
		let hours = date.getHours().toString();
		if (hours.length === 1) {
			hours = `0${hours}`;
		}
		let day = date.getDate().toString();
		if (day.length === 1) {
			day = `0${day}`;
		}
		let month = date.getMonth().toString();
		if (month.length === 1) {
			month = `0${month}`;
		}
		const year = date.getFullYear().toString();
		time = `${year}-${month}-${day} ${hours}:${minutes}`;
		return time;
	};

	const sendMessage = (event, value, inputFiles) => {
		event.preventDefault();
		if (inputFiles !== null || value !== '') {
			const list = [];
			let attachType = 'none';
			const data = new FormData();
			data.append('username', username);
			data.append('opponent', name);
			data.append('date', getTime());
			data.append('content', value);
			if (inputFiles !== null) {
				attachType = 'image';
				for (let i = 0; i < inputFiles.length; i+=1) {
					data.append(inputFiles[i].name, inputFiles[i]);
					const fileURL = window.URL.createObjectURL(inputFiles[i]);
					list.push(
						<img
							src={fileURL}
							alt="img"
							className={styles.message_attach_img}
							key={list.length}
							onLoad={() => {
								window.URL.revokeObjectURL(fileURL);
							}}/>
					);
				};
			}
			data.append('attach_type', attachType);
			fetch(`${url}/messages/create/`, {
				method: 'POST',
				headers: {
					'Authorization': `JWT ${localStorage.getItem('token')}`
				},
				body: data,
			}).then((res) => {
				if (res.ok) {
					setMessages([
						...messages,
						<div style={container.not_read} key={messages.length}>
							<div
								className={styles.message_container}
								style={container.mine}>
								<div>{value}</div>
								<div className={styles.message_attachments}>{list}</div>
								<div className={styles.message_time}
									style={container.mine}>{getTime().split(' ')[1]}</div>
							</div>
						</div>,
					]);
					setAttachments([]);
					setClip(false);
					setCurrentMessage('');
					CurrMessageInput.current.value = '';
					chatBottom.current.scrollIntoView({'block': 'end'});
				} else if (res.status === 401) {
					logout();
				}
			});
		}
	};

	const loadMessages = useCallback(() => {
		fetch(`${url}/messages/get_all/?username=${username}&opponent=${name}`, {
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`
			}
		}).then((res) => {
			if (res.ok) {
				res.json().then((json) => {
					// let list = [];
					// json.messages.map((element) => {
					// if (element.attachments.type === 'images') {
					// let attachs = [];
					// element.attachments.url.map((url) => {
					// attachs.push(
					// <img
					// src={url}
					// key={attachs.length}
					// className={styles.message_attach_img}
					// alt=""/>);
					// return 0;
					// });
					// list.push(
					// <div className={styles.message_wrapper}
					// key={list.length}
					// style={element.read ? container.read : container.not_read}>
					// <div
					// className={styles.message_container}
					// style={username === element.author ? container.mine : container.not_mine}>
					// <div className={styles.message_avatar}
					// style={username === element.author ? container.mine : container.not_mine}><img className={styles.avatar} src={element.avatar} />{element.author}</div>
					// <div>{element.message}</div>
					// <div>{attachs}</div>
					// <div className={styles.message_time}
					// style={username === element.author ? container.mine : container.not_mine}>{element.time.split('T')[1].slice(0, 5)}</div>
					// </div>
					// </div>
					// );
					// } else if (element.attachments.type === 'audio') {
					// list.push(<div className={styles.message_wrapper}
					//      key={list.length} style={element.read ? container.read : container.not_read}>
					//      <audio
					//      controls
					//      src={element.attachments.url}
					//      className={styles.audio_output}
					//      key={list.length}
					//      style={username === element.author ? container.mine : container.not_mine}/></div>)
					// } else if (element.attachments.type === 'geolocation') {
					//      list.push(
					//      <div className={styles.message_wrapper}
					//      key={list.length} style={element.read ? container.read : container.not_read}>
					//      <div
					//      className={styles.message_container}
					//      style={username === element.author ? container.mine : container.not_mine}>
					//     <div className={styles.message_avatar}
					//      style={username === element.author ? container.mine : container.not_mine}><img className={styles.avatar} src={element.avatar} />{element.author}</div>
					//      <div>{'Ваше местоположение: '}<a href={element.attachments.url}>{element.attachments.url}</a></div>
					//      <div className={styles.message_time}
					//      style={username === element.author ? container.mine : container.not_mine}>{element.time.split('T')[1].slice(0, 5)}</div>
					//      </div>
					//      </div>
					//      )
					// } else {
					//      list.push(
					// <div className={styles.message_wrapper}
					// key={list.length} style={element.read ? container.read : container.not_read}>
					//      <div
					//      className={styles.message_container}
					//      style={username === element.author ? container.mine : container.not_mine}>
					//      <div className={styles.message_avatar}
					//      style={username === element.author ? container.mine : container.not_mine}><img className={styles.avatar} src={element.avatar} />{element.author}</div>
					//      <div>{element.message}</div>
					//      <div className={styles.message_time}
					//      style={username === element.author ? container.mine : container.not_mine}>{element.time.split('T')[1].slice(0, 5)}</div>
					//      </div>
					//      </div>
					//      )
					// }
					// return 0;
					// });
					// setMessages(list);
					// setLoading(false);
				});
			} else if (res.status === 401) {
				logout();
			}
		});
	}, [logout, name, username]);

	const handleChange = (event) => {
		setCurrentMessage(event.target.value);
	};

	useEffect(() => {
		fetch(`${url}/users/search_username/?username=${username}`, {
			headers: {
				'Authorization': `JWT ${localStorage.getItem('token')}`
			},
		}).then(res => {
			if (res.ok) {
				res.json().then(json => {
					if (!json.users.includes(name)) {
						history.push(`${process.env.PUBLIC_URL}/`);
					}
				});
			} else if (res.status === 401) {
				logout();
			}
		});
		loadMessages();
	}, [history, loadMessages, logout, name, username]);

	useEffect(() => {
		CurrMessageInput.current.focus();
	}, []);

	// useEffect(() => {
	// chatBottom.current.scrollIntoView({'block': 'end'});
	// }, [loading]);

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

	useInterval(loadMessages, 5000);

	return (
		<div className={styles.wrapper}>
			<div className={styles.chat_header}>
				<div className={styles.chat_exit_button} onClick={() => history.push('/')} tabIndex={0} role="button" onKeyPress={() => {}}>
					&#8678;
				</div>
				<div className={styles.chat_name}>{name}</div>
			</div>
			<div className={styles.messages_list} ref={chatBottom}>{messages}</div>
			<form onSubmit={(event) => sendMessage(event, currentMessage.trim(), files)}
				className={styles.chat_input}>
				{clipMenuToggle ? attachMenu : null}
				<div
					className={styles.input_form}
					onDragEnter={(event) => event.preventDefault()}
					onDragOver={(event) => event.preventDefault()}
					onDrop={(event) => {
						event.preventDefault();
						setFiles(event.dataTransfer.files);
						previewFiles(event.dataTransfer.files);
					}}>
					<div
						onClick={() => setClip(!clipMenuToggle)}
						onKeyPress={() => {}} role='button'
						tabIndex={0} className={styles.clip_wrapper}>
						<img
							src={clip}
							className={styles.attach_icon}
							alt="img"/>
					</div>
					<input
						type="text"
						onChange={(event) => handleChange(event)}
						className={styles.message_input}
						ref={CurrMessageInput}/>
					{sendButton}
				</div>
				<div className={styles.attachments_list}>{attachments}</div>
			</form>
		</div>
	);
}

Chat.propTypes = {
	username: PropTypes.string.isRequired,
	logout: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			name: PropTypes.string.isRequired,
		})
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired
};

export default withRouter(Chat);

