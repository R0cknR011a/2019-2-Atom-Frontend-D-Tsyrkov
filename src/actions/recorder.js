function wait(ms) {
	const start = new Date().getTime();
	let end = start;
	while(end < start + ms) {
		end = new Date().getTime();
	}
}

async function getMedia() {
	let stream = null;
	let audioURL = null;
	try {
		stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		const mediaRecorder = new MediaRecorder(stream);
		let chunks = [];
		// mediaRecorder.addEventListener('stop', (event) => {
		// 	const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
		// 	chunks = [];
		// 	audioURL = URL.createObjectURL(blob);
		// });
		mediaRecorder.ondataavailable = (event) => {
			chunks.push(event.data);
		};
		mediaRecorder.start();
		wait(5000);
		mediaRecorder.stop();
		const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
		audioURL = window.URL.createObjectURL(blob);
		return audioURL;
	} catch(err) {
		return -1;
	}
}

export default getMedia;