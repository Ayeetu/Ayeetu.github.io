

	let loginBtn = document.querySelector(".login");
	let registerBtn = document.querySelector(".register");
	let logoutBtn = document.querySelector(".logout");
	let dashboardBtn = document.querySelector(".dashboard-btn");

	let loginModal = document.querySelector(".login-modal");
	let registerModal = document.querySelector(".register-modal");
	let dashboard = document.querySelector(".dashboard");

	let loginSbmt = loginModal.querySelector(".login-btn");
	let registerSbmt = registerModal.querySelector(".register-btn");

	let displayUsername = document.querySelector(".display-username");

	let message  = document.querySelector(".message");
	let msgClose = message.querySelector(".msg-close");

	let searchResults = {};
	let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
	let users = JSON.parse(localStorage.getItem("users")) || [];
	let currentUser = localStorage.getItem("currentUser") || "";

	let navIcon = document.querySelector(".nav-icon");
	let mainNav = document.querySelector(".main-nav");


	// Functions

	function flashMessage(msg) {
		message.children[0].textContent = msg;
		message.classList.add("flash");

	}


	function getMovies(search) {
		fetch(`//www.omdbapi.com?s=${search}`)
			.then((blob) => {
				return blob.json();
			})
			.then((data) => {
				searchResults = data.Search;
				$("#results").fadeIn(400, function() {
						$("#singleView").fadeOut();

				});
				if(searchResults) {
					$("#results").html('');
					for(var value of searchResults) {
						if(value.Type == "movie") {
							$("#results").append(`
								<div class="movie">
									<img src="${value.Poster}" class="poster"/>
									<a href="//www.omdbapi.com/?i=${value.imdbID}" class="title">${value.Title}</a>
									<p class="year">${value.Year}</p>
								</div>
							`);
							
						}
					}
					
				}
				
			})
			.catch((err) => {
				console.log(err);
			})
	}

	$("#search").on("input",(e) => {

		let search = e.currentTarget.value;

		getMovies(search);
	})

	$("#results").on("click", ".title", function(e) {
		let href = e.currentTarget.href
		fetch(href)
			.then(function(blob) { return blob.json()} )
			.then(function(data) { 
				console.log(data);
				// Hide the movie result and display the clicked movie infromation
				$("#results").fadeOut(400, function() {
					$("#singleView").fadeIn();
				});
				$("#singleView").html(`
					<img src="${data.Poster}" alt="" class="poster" />
					<div class="content">
						<h1 class="title">${data.Title}</h1>
						<div class="meta">
							<span class="year">${data.Year}</span>
							<span class="runtime">${data.Runtime}</span>
							<span class="score">IMDB:  <span class="green">${data.imdbRating} </span></span>
						</div>
						<p class="description">${data.Plot}</p>
					</div>
					<ul class="actions">
						<li class="ion-android-favorite"></li>
					</ul>
				`)

				// add a click on favorite so we can add the movies to our list
				// we need to create the listener only after the element has 
				// been created

				favorite = document.querySelector(".actions li");

				favorite.addEventListener("click",function() {
					let title = document.querySelector("#singleView .title").textContent;

					// push the title to the favorites array
					console.log(favorites[currentUser]);
					favorites[currentUser].push(title);
					localStorage.setItem("favorites", JSON.stringify(favorites));

					// Create an li and push it to the favorite movies list
					let li  = document.createElement("li");
					li.textContent = title;
					dashboard.querySelector(".fav-movies").appendChild(li);
				})
				

			 });

		
		e.preventDefault();


	})

	function showLoginModal() {
		loginModal.classList.toggle("show");
		registerModal.classList.remove("show");
		
	}

	function showRegisterModal() {
		loginModal.classList.remove("show");
		registerModal.classList.toggle("show");
	}

	function registerUser() {
		let username = registerModal.querySelector("input[type=text]").value;

		// Error Checking
		if(username.length < 3 || username.length > 20) {
			flashMessage("username needs to be between 3 and 20 characters long");
			return;
		}

		// Check if user already exists 
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i] === username) {

				flashMessage("A user with that username already exists please choose antoher");
				return;
			}
		}

		// The user does not exist push him onto the users array
		// which will be in turn stored on localStorage
		flashMessage("You have successfully registered!");
		users.push(username);
		localStorage.setItem("users", JSON.stringify(users));
		localStorage.setItem("currentUser", username);
		favorites[username] = [];
		localStorage.setItem("favorites", JSON.stringify(favorites));
		registerModal.classList.remove("show");

		return;
		
	}

	function signIn() {
		let username = localStorage.getItem("currentUser");
		displayUsername.querySelector("span").textContent = username;
		displayUsername.classList.add("display");

		loginBtn.parentNode.classList.remove("display");
		loginBtn.parentNode.classList.add("hide");
		dashboardBtn.classList.add("display");
		loginModal.classList.remove("show");
		logoutBtn.classList.add("display");

		currentUser = username;
		localStorage.setItem("currentUser", username);
		populateFavorites();
		flashMessage("You have been logged in");

	}


	function loginUser() {
		let username = loginModal.querySelector("input[type='text']").value;

		if(users.length === 0) {
			flashMessage("that user does not exist!");
		}
		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i] === username) {
				localStorage.setItem("currentUser", username);
				signIn();
				return;
			} else {
				flashMessage("that username does not exist please check that you typed correctly!");
			}

		}
		
		
	}

	function logoutUser() {

		this.classList.remove("display");
		loginBtn.parentNode.classList.add("display");
		displayUsername.classList.remove("display");
		dashboardBtn.classList.remove("display");
		localStorage.removeItem("currentUser");

		flashMessage("You have been logged out");


	}

	function toggleDashboard() {
		dashboard.classList.toggle("slide-in");
	}

	function populateFavorites() {
		dashboard.querySelector(".fav-movies").innerHTML = "";
		// If the user is logged in populate the list
		if(currentUser) {
			for (var i = 0; i <= favorites[currentUser].length - 1; i++) {
				

				let li  = document.createElement("li");
				li.textContent = favorites[currentUser][i];
				dashboard.querySelector(".fav-movies").appendChild(li);

			}
		}

		return;
	}

	// Event listeners and bootstrap

	loginBtn.addEventListener("click",showLoginModal);

	registerBtn.addEventListener("click", showRegisterModal )

	logoutBtn.addEventListener("click", logoutUser);

	dashboardBtn.addEventListener("click", toggleDashboard);

	loginSbmt.addEventListener("click", loginUser);

	registerSbmt.addEventListener("click", registerUser);


	message.addEventListener("animationend",function(e) {
		console.log(e);
		if(e.animationName === "flash") this.classList.remove("flash");
			
	})

	msgClose.addEventListener("click",function() {
		message.classList.remove("flash");
	})

	navIcon.addEventListener("click",function() {
		mainNav.classList.toggle("show-nav");
	})
	

	if(localStorage.getItem("currentUser")) {
		signIn();
	}

	

