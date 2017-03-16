app.service("interaction", ["$http", "servant", loadInteraction]);
// Main function
function loadInteraction($http, servant){
	this.injectParticularEditor = function(field, form, host, callback = new Function()){
		// If content type = option
		var contentType = field.getAttribute("content-type");
		if(contentType == "option"){
			var autocomplete = new Awesomplete(field);
		}
		// Create URL that use for address to send data
		field = "string" === typeof field ? document.querySelector(field) : field || null;
		if(!field){
			console.log("Object is not valid");
		}
		else {
			var url = form.getAttribute("action-path");
			url = url.replace(/^\/(.+)/, "$1");
			url = `${host}/${url}`;
			field.onfocus = function(){
				if(autocomplete){
					autocomplete.evaluate();
					autocomplete.open();
				}
				var firstContent = this.innerText.replace(/^([\r\n ]+)(.*)([\r\n ]+)$/, "$2");
				this.onblur = function(){
					var currentInput = form[this.getAttribute("name")];
					if(!currentInput){
						currentInput = document.createElement("input");
						currentInput.setAttribute("type", "hidden");
						currentInput.setAttribute("name", this.getAttribute("name"));
						form.appendChild(currentInput)
					}
					var tesis = this.innerText.replace(/^([\r\n ]+)(.*)([\r\n ]+)$/, "$2");
					console.log(tesis);
					if(tesis != "" && tesis != firstContent){
						// Create form data
						currentInput.value = tesis;
						console.log(currentInput.value)
						var material = new FormData(form);
						if(form.hasAttribute("form-control") && form.getAttribute("form-control") == "true"){
							var inputs = form.querySelectorAll("input, textarea");
							console.log(inputs);
							for(x = 0;x < inputs.length;x++){
								var input = inputs[x];
								console.log(`${input.getAttribute("name")} : ${input.value}`);
								material.append(input.getAttribute("name"), input.value);
							}
						}	
						var information = {
							method : "POST",
							url : url,
							headers : {
								"Content-Type" : undefined
							},
							data : material
						}
						console.log(information);
						function onsuccess(res){
							console.log("Data berhasil terkirim");
							callback(res);
						}

						function onerror(res, data){
							console.log(`Data gagal terkirim`);
						}

						$http(information).then(onsuccess, onerror);

					}
					else {
						this.innerText = firstContent;
					}
				}

				this.onkeypress = function(event){
					if(autocomplete){
						event.preventDefault();
						if(contentType) {
							this.innerText = firstContent;
						}
					}
					if(event.key == "Enter"){
						event.preventDefault();
						this.blur();
						this.innerText = this.innerText.replace(/^([\r\n ]+)(.*)([\r\n ]+)$/, "$2");
						this.onblur();
					}
				};
			};
		}
	}
	this.injectEditor = function(form, host){
		var elementEditor = form.querySelectorAll("[contenteditable='true']")
		, injectParticularEditor = this.injectParticularEditor;
		elementEditor.forEach(function(currentEditor){
			injectParticularEditor(currentEditor, form, host);
		});
	}

	this.injectAllEditor = function(wrapper, host){
		var forms = wrapper.querySelectorAll("form, [form-control='true']")
		, injectEditor = this.injectEditor;
		forms.forEach(function(form){
			injectEditor(form, host);
		});
	}
	
	// Show menu when moving cursor and scrolling page
	this.fadeDownNavigation = function(){
		var timeover, navContent = document.querySelector(".nav-content");
		function fadeDown(){
			if(timeover) clearTimeout(timeover);
			navContent.style.animation = "";
			navContent.style.animation = "slideDown .9s";
			setTimeout(function(){
				navContent.style.height = "auto";
				timeover = setTimeout(function(){
					navContent.style.animation = "slideUp .9s";
					setTimeout(function(){
						navContent.style.height = "0";
					}, 880);
				} ,3000);
			}, 880);
		}

		document.onmousemove = function(){

		}
	}
	// Show default notification
	this.showNotification = function(title, content){
		var notif = new Notification(title, { body : content });
		return notif;
	}
	
	// Move one element to one other
	this.moveElement = function(source, target){
		source = "string" == typeof source ? document.querySelector(source) : source;
		target = "string" == typeof target ? document.querySelector(target) : target;
		target.appendChild(source);
	}
	
	// Move page of form to form container element
	this.handleParam = function(param){
		if(param === "move"){
			var formContainer = document.querySelector(".form-container")
			, formboard = document.querySelector(".form-whiteboard");
			formboard.innerHTML = "";
			formboard.appendChild(formContainer);
			this.riseForm();
		}
		else if(param === "printmoving"){
			var printContainer = document.querySelector(".print-container")
			, printboard = document.querySelector(".print-whiteboard");
			printboard.innerHTML = "";
			printboard.appendChild(printContainer);
			this.riseForm();	
		}
	}
	this.isMatchArea = function(target, actor){
		target = "string" == typeof target ? document.querySelector(target) : target;
		actor = "string" == typeof actor ? document.querySelector(actor) : actor;
		if(target && actor) {
			while(target.tagName !== "BODY"){
				if(target == actor){
					return target;
					break;
				}
				target = target.parentElement;
			}
		}	
		return false;	
	}
	// Remove element when user click close button
	this.removeElement = function(obj, actor){
		var parentObj = this.isMatchArea(obj, actor);
		if (parentObj) parentObj.parentElement.removeChild(parentObj);
	}
	// Create money format
	this.viewMoneyFormat = function(value){
		var sample = String(value)
		, length = sample.length
		, dotLength = 0
		, flags = ((length / 3) % 3) == 0 ? (length / 3) - 1 : Math.floor(length / 3);
		sample = sample.split("").reverse();
		for(var x = 1;x <= flags;x++){
			// Append dot in multiply 3 of letter
			var start = (x * 3) + dotLength;
			sample.splice(start, 0, ".");
			++dotLength;
		}
		var result = sample.reverse();
		result = result.join("");
		return result;
	}
	this.showError = function(text, extraClass = ""){
		var validationPanel = document.getElementById("validation-panel")
		, validationBody = document.createElement("div")
		, message = document.createTextNode(text);
		// Append several class and animation
		validationBody.style.animation = "peek-a-boo .4s";
		validationBody.classList.add("validation-body");
		if(extraClass) validationBody.classList.add("success");
		// Wrap element
		validationBody.appendChild(message);
		validationPanel.appendChild(validationBody);
		setTimeout(function(){
			validationBody.style.animation = "ghost-dim 3s";	
			setTimeout(function(){
				validationPanel.removeChild(validationBody);
			}, 2800);	
		}, 4000);	
	}
	this.handleValidation = function(param){
		if("object" == typeof param){
			for(x in param){
				with(param[x]){
					if(!pattern.test(sample)){
						this.showError(message);	
						return false;
					}
				}
			}	
		}
		return true;	
	}
	this.handleError = function(selector){
		// Handle action event for show error
		var handler = {};
		handler.target = document.querySelectorAll(selector)
		handler.pattern = null;
		handler.sample = null;
		handler.look = function(pattern, sample, message){
			this.pattern = pattern;
			this.sample = sample;
			this.message = message;	
			return this;
		}
		handler.listen = function(handling){
			var pattern = this.pattern, sample = this.sample, message = this.message;
			this.target.forEach(function(item){
				item.addEventListener(handling, function(){
					data = sample;
					data = data == "#this#" ? this.value : data;
					if(!pattern.test(data)){
						this.showError(message);	
					}
				})	
			});
			return true;
		}

		return handler;	
	}
	// Function for return computer valid date
	this.viewComputerdate = function(datepick){
		var calendar = new Date(datepick)
		, mm = calendar.getMonth() + 1
		, dd = calendar.getDate()
		, yyyy = calendar.getFullYear();

		return mm + "/" + dd + "/" + yyyy;
	}
	// function for return indonesian valid date
	this.viewCommonDate = function(datepick){
		var calendar = new Date(datepick)
		, date = calendar.getDate()
		, indexMonth = calendar.getMonth()
		, year = calendar.getFullYear()
		, indoMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
		, completeDate = date + " " + indoMonth[indexMonth] + " " + year;

		return completeDate; 
	} 

	this.resetInput = function(obj = null){
		if(obj){
			var target = obj.querySelectorAll("input");
		}
		else {
			var target = document.querySelectorAll("input");
		}
		target.forEach(function(item){
			if(item.value) item.value = "";
		});
	}
}