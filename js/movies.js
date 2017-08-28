// variables 
let loginBtn = document.querySelector(".login");
let registerBtn = document.querySelector(".register");
let logoutBtn = document.querySelector(".logout");
let dashboardBtn = document.querySelector(".dashboard-btn");
let resultsDiv = document.querySelector("#results");
let search = document.querySelector("#search");
let singleView = document.querySelector("#singleView");
let wrapper  = document.querySelector(".wrapper");
let form = document.querySelector("form");

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

let searchUrl = "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1";
let movieUrl = "https://api.themoviedb.org/3/movie/";
let apiKey = "8fda8ba3a8080919d09bae737561b08c";

// Functions

// flashes a message to the screen by adding a flash class to the message div
// we listen on the animationend event to fade out the message
function flashMessage(msg) {
	message.children[0].textContent = msg;
	message.classList.add("flash");

}

// vanilla javascript smooth scroll to implementation
// element = the element to scroll, length = how many pixels do we scroll the element
// duration = scroll duration miliseconds, t = interval
function scrollToElement(element, length, duration, t) {
	if(duration < 0) return;
	let ticks = t || 10;
	let difference = length - element.scrollTop;
	let perTick = difference / duration * ticks;
	if(!duration) var duration = 600;
	setTimeout(function() {
		element.scrollTop = element.scrollTop + perTick;

		if(Math.ceil(element.scrollTop) === length) {
			return;
		} else {
			scrollToElement(element, length, duration - 10, 10);
		}
		
	},ticks);
	return;
}

// get the using from the movie database api pass in the search query (api key is needed on this api)
function getMovies(search) {
	fetch(`${searchUrl}&api_key=${apiKey}&query=${search}`)
		.then((blob) => {
			return blob.json();
		})
		.then((data) => {
			// get the array of movies
			searchResults = data.results;

			// sort the movies array by popularity
			searchResults.sort(function(a, b) {
				if (a.popularity > b.popularity)
				    return -1;
				  if (a.popularity < b.popularity)
				    return 1;
				  return 0;
			})
			// show the results div and fade out the single movie details if it was open beforehand
			resultsDiv.classList.add("fade-in");
			singleView.classList.remove("fade-in");
			if(searchResults) {
				// if we got results empty the last search results
				resultsDiv.innerHTML = "";

				// go over every object inside the array and populate the results Div
				for(var value of searchResults) {
						resultsDiv.innerHTML += `
							<div class="movie">
								<img src="https://image.tmdb.org/t/p/w300/${value.poster_path}" class="poster" onerror="this.src='images/not_found.png';"/>
								<a href="${movieUrl}${value.id}?api_key=${apiKey}" class="title">${value.title}</a>
								<p class="year">${value.release_date.slice(0,4)}</p>
							</div>
						`;
				}
				
			}
			
		})
		.catch((err) => {
			console.log(err);
		})
}

// we need to use event delegation beacuse we are searching for
// dynamically created elements
document.body.addEventListener("click", function(e) {
	// only use fetch the page if we clicked on the movie link
	console.log(e.target.matches("a.title"));
	if(e.target.className === "title" && e.target.tagName === "A") {
		// get the movies url and fetch it
		let href = e.target.href;
		fetch(href)
			.then(function(blob) { return blob.json()} )
			.then(function(data) { 
				// Hide the movie result and display the clicked movie infromation
				resultsDiv.classList.remove("fade-in")
				singleView.classList.add("fade-in");

				// scroll to 100px from the top of the window in case we scrolled down too much
				document.body.scrollTop = 100;

				// to check if we already favorited a movie we go through all the favorite movies
				// and compare them with the clicked movie then add the active class accordingly
				// we add or remove the favorite button accordingly
				favBtn = '<li class="ion-android-favorite"></li>';

				if(currentUser)
					for(let i = 0; i < favorites[currentUser].length; i++) {
						if(data.title === favorites[currentUser][i]) favBtn = '<li class="ion-android-favorite active"></li>'
					}

				singleView.innerHTML = `
					<img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="poster" onerror="this.src='images/not_found.png';"/>
					<div class="content">
						<h1 class="title">${data.title}</h1>
						<div class="meta">
							<span class="year">${data.release_date.slice(0,4)}</span>
						</div>
						<span class="runtime">${data.runtime} minutes</span> 
						<p class="description">${data.overview}</p>
					</div>
					<ul class="actions">
						${favBtn}
					</ul>
				`;



				// add a click on favorite so we can add the movies to our list of favorites
				// we need to create the listener only after the element has been created beacause 
				// it would not work before that beacuse it doesn't exist
				favorite = document.querySelector(".actions li");

				// scroll to the top of the window so we can see the movie infromation
				wrapper.scrollTop = 0;

				favorite.addEventListener("click",function() {
					let title = document.querySelector("#singleView .title").textContent;
					let duplicate = false; // flag which is checked if we will add a new movie to favorites

					// go over the favorites and check if the clicked movie is already favorited
					// set the duplicate flag to true if it is
					for(let i = 0; i < favorites[currentUser].length; i++) {
						if(title === favorites[currentUser][i])  {
							duplicate = true;
							break;
						}

					}
					// only push the title to the array of favorites if it dosent already exist
					if(!duplicate) {
						favorites[currentUser].push(title);
						localStorage.setItem("favorites", JSON.stringify(favorites));

						// Create an li and push it to the favorite movies list
						let li  = document.createElement("li");
						li.textContent = title;
						dashboard.querySelector(".fav-movies").appendChild(li);

						// make the favorite button green
						favorite.classList.add("active");
					}

				})
				
			 });	
	}

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
	let username = registerModal.querySelector("input[type=text]");
	let password = registerModal.querySelector("input[type=password]");

	// Error Checking
	if(username.value.length < 3 || username.value.length > 20) {
		flashMessage("username needs to be between 3 and 20 characters long");
		return;
	}

	// Check if user already exists 
	for (var i = users.length - 1; i >= 0; i--) {
		if(users[i] === username.value) {

			flashMessage("A user with that username already exists please choose antoher");
			return;
		}
	}

	// The user does not exist push him onto the users array
	// which will be in turn stored on localStorage
	flashMessage("You have successfully registered!");
	// clear the username input value

	users.push(username.value);
	localStorage.setItem("users", JSON.stringify(users));
	localStorage.setItem("currentUser", username.value);
	favorites[username.value] = [];

	// clear the username and password fields
	username.value = "";
	password.value = "";
	// add the favorites array 
	localStorage.setItem("favorites", JSON.stringify(favorites));
	registerModal.classList.remove("show");

	return;
	
}

function signIn() {
	let username = localStorage.getItem("currentUser");
	displayUsername.querySelector("span").textContent = username;
	displayUsername.classList.add("display");

	loginBtn.classList.remove("display");
	loginBtn.classList.add("hide");
	dashboardBtn.classList.add("display");
	loginModal.classList.remove("show");
	logoutBtn.classList.add("display");

	currentUser = username;
	localStorage.setItem("currentUser", username);
	populateFavorites();
	flashMessage("You have been logged in");

	// clear the username and the password 
	let u = loginModal.querySelector("input[type='text']");
	let p = loginModal.querySelector("input[type='password']");
	u.value = "";
	p.value = "";

}


function loginUser() {
	let username = loginModal.querySelector("input[type='text']");


	if(users.length === 0) {
		flashMessage("that user does not exist!");
	}
	for (var i = users.length - 1; i >= 0; i--) {
		if(users[i] === username.value) {
			localStorage.setItem("currentUser", username.value);
			// call the sign in function if we find the user inside the users array
			signIn();
			return;
		} else {
			flashMessage("that username does not exist please check that you typed correctly!");
		}

	}
	
	
}

function logoutUser() {

	this.classList.remove("display");
	loginBtn.classList.add("display");
	displayUsername.classList.remove("display");
	dashboardBtn.classList.remove("display");
	dashboard.classList.remove("slide-in");
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


search.addEventListener("input", function(e) {
	// serach for movies with the value of the search input
	getMovies(this.value);
})


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

