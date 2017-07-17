(function() {
	const timeLeft = document.querySelector(".display__time-left");
	const endTime  = document.querySelector(".display__end-time");
	const timerControls = document.querySelectorAll("[data-time]");
	const input = document.querySelector("input");
	let time = 0;
	// Global variable where we store the setInterval id;
	let ctdwn;
	const alarmSound = new Audio("content/default.mp3");

	function startTimer(time) {
		// Stop the sound from playing if we click 
		// (if we click another button while the sound is playing)
		alarmSound.pause();
		alarmSound.currentTime = 0;

		// set the end timer to the current time plus the timers value
		let d = new Date();
		let calcMinutes = (d.getSeconds() > 30) ? Math.floor((time / 60)) + 1 : Math.floor((time / 60))
		prefix = ""; // we use this to prefix a zero if the minutes are smaller than 10
		d.setMinutes(d.getMinutes() + calcMinutes);
		if(d.getMinutes() < 10) prefix = "0";
		endTime.innerHTML = `Be back at: ${d.getHours()}:${prefix}${d.getMinutes()}`;
		ctdwn = setInterval(function() {
			--time;

			let formatedTime = formatTime(time);
			timeLeft.innerHTML = formatedTime;

			if(time <= 0) {
				alarmSound.play();
				clearInterval(ctdwn);
			}
		},1000)
	}

	function handleClick(e) {
		// Clear the interval from the global ctdwn variable
		clearInterval(ctdwn);
		

		// Get the time from the data attribute on the clicked button
		time = this.getAttribute("data-time");
		let formatedTime = formatTime(time);
		timeLeft.innerHTML = formatedTime;

		// Start the timer which starts the setInterval
		startTimer(time);


	}

	function handleInput(e) {
	     	clearInterval(ctdwn);
			const minutes = e.currentTarget.value * 60;
			time = minutes;
			let formatedTime = formatTime(minutes);
			timeLeft.innerHTML = formatedTime;
			startTimer(time);
			e.preventDefault();
	}	

	function formatTime(time) {
		// We only need to format if the time is over 1 minute otherwise 
		// just return the seconds
		if(time >= 60) {
			return (`${Math.floor(time / 60)}:${time % 60}`);
		} 

		return time;
	}

	timerControls.forEach(t => {
		t.addEventListener("click", handleClick);
	})

	input.addEventListener("change",handleInput);
})()