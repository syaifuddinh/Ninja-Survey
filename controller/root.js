// Root of application
var app = angular.module("root", ["ngRoute"]);
HTMLCollection.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.map = Array.prototype.map;
// Toggle loading frame
window.toggleLoader = function(show = true){
	if(show && !document.querySelector(".loading-frame")){
		var loadingFrame = document.createElement("div");
		loadingFrame.classList.add("loading-frame");
		document.body.appendChild(loadingFrame);
	}
	else{
		loadingFrame = document.querySelector(".loading-frame");
		if(loadingFrame) {
			loadingFrame.style.animation = "loader-fadeout .9s";
			setTimeout(function(){
				loadingFrame.parentElement.removeChild(loadingFrame);
			}, 890)
		}
	}
}
// Handle navigation of active menu
window.activeMenu = [];
var backwardBTN = document.querySelector("[button-control='backward']");
if(backwardBTN){
	backwardBTN.onclick = function(){
		activeMenuLength = window.activeMenu.length;
		if(activeMenuLength > 0){
			console.log(window.activeMenu);
			var currentMenu = window.activeMenu[activeMenuLength - 1];
			if(activeMenuLength == 1) var transitionHref = "index.html";
			else if(activeMenuLength > 1) var transitionHref = window.activeMenu[activeMenuLength - 1].href;
			console.log(transitionHref);

			var frontCurrentMenu = window.activeMenu[activeMenuLength - 2];
			console.log(currentMenu);
			console.log(frontCurrentMenu);
			var currentMenuEL = document.querySelector(`[data-menu=${currentMenu["data-menu"]}]`);
			console.log(currentMenuEL);
			currentMenuEL = currentMenuEL.parentElement;
			currentMenuEL = currentMenuEL.parentElement.removeChild(currentMenuEL);
			window.toggleLoader();
			location.href = transitionHref;
		}
	}
}
else console.log("[button-control='backward'] not found");
// Handle logout
// Add active menu
window.clearAllMenu = function(){
	var leftMenu = document.querySelector(".nav-leftside")
	, leftMenuItems = leftMenu.getElementsByClassName("nav-content-list");
	leftMenuItems.forEach(function(item, index){
		if(index > 0) {
			leftMenu.removeChild(item);
		}
	});
	window.activeMenu = [];
}
window.insertMenu = function(name){
	var menuWrap = document.querySelector(".nav-leftside")
	, newActiveMenu = document.querySelector("newactivemenu div").cloneNode(true)
	, nameWrap = newActiveMenu.getElementsByClassName("data-name")[0];

	nameWrap.innerHTML = name;
	menuWrap.appendChild(newActiveMenu);
}

var logoutBTN = document.querySelector("[button-control='logout']");
if(logoutBTN) {
	logoutBTN.onclick = function(){
		window.toggleLoader();
		var transaction = window.db.transaction(["participants"], "readwrite").objectStore("participants");
		transaction.delete(1);
		location.href = "index.html#login";
	};
}
// Meng-handle tombol go-homepage
var homepageBTN = document.querySelector("[button-control='homepage']");
homepageBTN.onclick = function(){
	window.toggleLoader();
	window.clearAllMenu();
	location.href = 'index.html#';
}
// Give animation in top navigation menu
var navboard = document.querySelector(".nav-board"), navboardHeight = navboard.clientHeight;
window.onscroll = function(){
	if(this.scrollY >= navboardHeight){
		navboard.style.animation = "slideDown .6s";
		navboard.setAttribute("style", "position:fixed;width:100%;top:0;left:0;overflow:hidden;z-index:100;");
		setTimeout(new Function("navboard.style.animation = ''"), 700);
	}
	else {
		navboard.setAttribute("style", "");
	}
}