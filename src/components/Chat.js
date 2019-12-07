import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../styles/message-form.module.css';
import clip from './paper-clip-6-64.png';
import play from './play-icon-white-png-8.jpg';
import stop from './Stop-circle-01.svg';

function Chat({ name }) {
	const [messages, setMessages] = useState([]);

	const inputRef = useRef(null);
	
	const scrollToBottom = () => {
		inputRef.current.scrollIntoView({block: 'end'});
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
	}, [name]);

	function MessageInput() {
		const [currentMessage, setCurrentMessage] = useState('');
		const [attach, setAttach] = useState(false);
		const [attachments, setAttachments] = useState([]);
		const [recording, setRecording] = useState(null);
		const [recorder, setRecorder] = useState(null);
		const [chunks, setChunks] = useState([]);
		const [sendButton, setSendButton] = useState(null);
		const [files, setFiles] = useState(null);

		const CurrMessageInput = useRef(null);
		const FileInputRef = useRef(null);

		const previewFiles = (inputFiles) => {
			if (inputFiles.length > 10) {
				alert('There is a file limit of 10 maximum');
			} else {
				const list = [];
				for (let i = 0; i < inputFiles.length; i+=1) {
					const fileURL = window.URL.createObjectURL(inputFiles[i]);
					list.push(
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
				setAttachments(list);
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
				console.log(err);
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
			fetch('https://tt-front.now.sh/upload', {
				method: 'POST',
				body: data,
			}).then(res => {
				if (res.ok) {
					const audioURL = window.URL.createObjectURL(blob);
					setMessages([
						...messages,
						// eslint-disable-next-line jsx-a11y/media-has-caption
						<audio controls src={audioURL} className={styles.audio_output} key={messages.length}/>
					]);
				}
			}).catch(err => {
				setMessages([
					...messages,
					<div className={styles.message_container} key={messages.length}>{err.message}</div>
				]);
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

		const attachMenu =
		<div className={styles.attach_menu}>
			<div className={styles.location} onClick={() => sendLocation()} role='button' tabIndex={0} onKeyPress={() => {}}>Location</div>
			<div className={styles.media} onClick={() => FileInputRef.current.click()} role='button' tabIndex={0} onKeyPress={() => {}}>Image</div>
			<input type="file" multiple accept="image/*" className={styles.attach_meni_idk} onChange={(event) => {
				setFiles(event.target.files);
				previewFiles(event.target.files);
			}} ref={FileInputRef} />
			<div className={styles.audio} onClick={(event) => recordHandler(event)} role='button' tabIndex={0} onKeyPress={() => {}}>
				Audio
				{recording ?
					<img src={stop} alt='stop'
						className={styles.play_stop}/>
						:
					<img src={play} alt='play'
						className={styles.play_stop}/>}
			</div>
		</div>;

		const sendLocation = () => {
			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition((position) => {
					const pos = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
					setMessages([
						...messages,
						<div key={messages.length} className={styles.message_container}>
							<a href={pos}>{`Ваше местоположение: ${pos}`}</a>
						</div>
					]);
				});
			} else  {
				alert('Geolocation is not respond');
			}
		};

		const handleChange = (event) => {
			setCurrentMessage(event.target.value);
		};

		const sendMessage = (event, value, inputFiles) => {
			event.preventDefault();
			if (inputFiles !== null || value !== '') {
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
				time = `${hours}:${minutes}`;
				if (value !== '') {
					const data = JSON.parse(localStorage.getItem(name));
					data.push([value, time]);
					localStorage.setItem(name, JSON.stringify(data));
				}
				if (inputFiles !== null) {
					const fileListToAttachment = [];
					const data = new FormData();
					for (let i = 0; i < inputFiles.length; i+=1) {
						data.append('image', inputFiles[i]);
						const fileURL = window.URL.createObjectURL(inputFiles[i]);
						fileListToAttachment.push(
							<img
								src={fileURL}
								alt="img"
								className={styles.message_attach_img}
								key={fileListToAttachment.length}
								onLoad={() => {
									window.URL.revokeObjectURL(fileURL);
								}}
							/>
						);
					};
					fetch('https://tt-front.now.sh/upload', {
						method: 'POST',
						body: data,
					}).then(res => {
						if (res.ok) {
							setMessages([
								...messages,
								<div className={styles.message_container} key={messages.length}>
									<div>{value}</div>
									<div className={styles.message_attachments}>{fileListToAttachment}</div>
									<div>{time}</div>
								</div>,
							]);
						}
					}).catch(err => {
						setMessages([
							...messages,
							<div className={styles.message_container} key={messages.length}>
								<div>{value}</div>
								<div>{err.message}</div>
								<div>{time}</div>
							</div>,
						]);
					});
				} else {
					setMessages([
						...messages,
						<div className={styles.message_container} key={messages.length}>
							<div>{value}</div>
							<div>{time}</div>
						</div>,
					]);
				}
			}
		};

		useEffect(() => {
			CurrMessageInput.current.focus();
		}, []);

		return (
			<form onSubmit={(event) => sendMessage(event, currentMessage.trim(), files)}>
				{attach ? attachMenu : null}
				<div
					className={styles.input_form}
					onDragEnter={(event) => event.preventDefault()}
					onDragOver={(event) => event.preventDefault()}
					onDrop={(event) => {
						event.preventDefault();
						setFiles(event.dataTransfer.files);
						previewFiles(event.dataTransfer.files);
					}}
				>
					<div onClick={() => setAttach(!attach)} onKeyPress={() => {}} role='button' tabIndex={0} className={styles.clip_wrapper}>
						<img
							src={clip}
							className={styles.attach_icon}
							alt="img"
						/>
					</div>
					<input
						type="text"
						onChange={(event) => handleChange(event)}
						className={styles.message_input}
						ref={CurrMessageInput}
					/>
					{sendButton}
				</div>
				<div className={styles.attachments_list}>{attachments}</div>
			</form>
		);
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.chat_header}>
				<Link to="/">
					<div className={styles.chat_exit_button}>
						&#8678;
					</div>
				</Link>
				<div className={styles.chat_name}>{name}</div>
			</div>
			<div className={styles.messages_list} ref={inputRef}>{messages}</div>
			<MessageInput name={name} />
		</div>
	);
}

Chat.propTypes = {
	name: PropTypes.string.isRequired,
};

export default Chat;
