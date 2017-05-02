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

function scrollToElement(element, to, duration) {
	console.log(element,to,duration);
	if(duration <= 0) return;

	let difference = to - element.scrollTop;
	let perTick = difference / duration * 10;;


	if(!duration) var duration = 600;
	setTimeout(function() {
		element.scrollTop = element.scrollTop + perTick;

		if(element.scrollTop === to) {
			console.log("reached target!");
			return;
		} else {
			console.log("didnt reach target");
			scrollToElement(element, to, duration - 10);
		}
		
	},10);

	return;
}

function scrollEvt(e) {
   let scroll = document.body.scrollTop;
   if(scroll >= 80) {
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
	scrollToElement(document.body, 0 , 600);
	e.preventDefault();
})

contactBtn.addEventListener("click", function(e) {
	scrollToElement(document.body, contact.offsetTop, 600);
	e.preventDefault();
});

examplesBtn.addEventListener("click", function(e) {
	scrollToElement(document.body, examples.offsetTop, 600);
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