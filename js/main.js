// Initializers

let navBtn = document.querySelector(".nav-icon");
let closeNav = document.querySelector(".close");
let nav = document.querySelector(".main-nav");

let header = document.getElementsByTagName("header")[0];

let contactBtn = document.querySelector("a[href*='contact']");
let contact = document.getElementById("contact");

let examplesBtn = document.querySelector("a[href*='examples']");
let examples = document.getElementById("examples");

let homeBtn = document.querySelector("a[href*='home']");
// Functions

function scrollToElement(element, length, duration) {
	if(duration < 0) return;

	let left = length - element.pageYOffset;
	let calc = left / (duration / 10);
	let scrollInt = setInterval(function() {
		left = Math.abs(left) - Math.abs(calc);
		console.log(left);
		element.scroll(0, element.pageYOffset + calc);
		if(left < 0) 
			clearInterval(scrollInt);
	}, 10)
}

function scrollEvt(e) {
   let scroll = document.body.scrollTop;
   if(scroll >= 0) {
   		header.classList.add("fixed");
   } else {
   		header.classList.remove("fixed");
   }


}

// Event Listeners

navBtn.addEventListener("click",function() {
	nav.classList.add("open-nav");
})

closeNav.addEventListener("click",function() {
	nav.classList.remove("open-nav");
})

homeBtn.addEventListener("click",function(e) {
	scrollToElement(window, 0 , 600);
	e.preventDefault();
})

contactBtn.addEventListener("click", function(e) {
	scrollToElement(window, contact.offsetTop, 600);
	e.preventDefault();
});

examplesBtn.addEventListener("click", function(e) {
	scrollToElement(window, examples.offsetTop, 600);
	e.preventDefault();
});


document.addEventListener("scroll", scrollEvt);

window.sr = new ScrollReveal({
      viewFactor : 0.30,
      duration   : 800,
      distance   : "0px",
      scale      : 0.8,
 });

let row = {
	origin   : "top",
    distance : "24px",
    duration : 600,
    scale    : 1.05,
}

let hero = {
	origin   : "top",
    distance : "24px",
    duration : 800,
    scale    : 0.8,
}

sr.reveal("#banner *",hero);
sr.reveal(".exmp-1 *", row);
sr.reveal(".exmp-2 *", row);
sr.reveal(".exmp-3 *", row);
sr.reveal("#contact .wrap .row *");