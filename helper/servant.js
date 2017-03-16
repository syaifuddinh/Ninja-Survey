app.service("servant", [loadServant]);
function loadServant(){
	// Function for change plain date textfield to amazing datepicker 
	this.initDatepick = function(){
		var datepicks = document.querySelectorAll("[type='date']");
		datepicks.forEach(function(item, index){
			command = "var date" + index + " = new Pikaday({field:item});";
			execute = eval(command); 
			console.log(execute);
		});
	}
	// Function for toggle loading frame
	this.toggleLoader = window.toggleLoader;
	this.offset = function(obj){
		that = { top : 0, left : 0};
		// do {
		// 	top += obj.offsetTop ? obj.offsetTop : 0;
		// 	left += obj.offsetLeft ? obj.offsetLeft : 0;
		// } while(obj = obj.offsetParent);
	}
	this.autocomplete = function(obj) {
		// obj = "string" == typeof obj ? document.querySelector(obj) : obj;
		// var objectWidth = obj.offsetWidth
		// , autocomplete = document.createElement("div")
		// , offset = this.offset(obj);
		// offset.top += obj.offsetHeight;
		// autocomplete.style.width = "${objectWidth}px";
		// autocomplete.classList.add("card");
		// autocomplete.classList.add("kageshibari");
		// autocomplete.classList.add("hidden");
		// autocomplete.innerHTML = `<ul class="panel-content"></ul>`;
		// autocomplete.onclick = function(event){
		// 	currentContent = event.target;
		// 	if(currentContent.classList.contains("panel-list")){
		// 		obj.value = currentContent.innerText;
		// 		obj.setAttribute("data-value", currentContent.getAttribute("data-value"));
		// 	}
		// }
		// document.body.apppendChild(autocomplete);
		// obj.onclick = function(){
		// 	if(autocomplete.classList.contains("hidden")) autocomplete.classList.remove("hidden");
		// }
		// obj.onfocus = obj.onclick;
		// var handler = {
		// 	listen : function(driver, values){
		// 		var list = "";		
		// 		values.forEach(function(content){
		// 			list += `<li class="panel-list" data-value="${content[driver.value]}">{{driver.label}}</li>`;
		// 		});
		// 		autocomplete.querySelector("ul").innerHTML = "";
		// 	}
		// };
		// return handler;
	}
}