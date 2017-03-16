app.service("inserting", ["$http", "server", "servant", "interaction", insertingInit]);
// Function load inserting
function insertingInit($http, server, servant, interaction){
	this.loadView = function(formTitle, options = [{}]){
		/**
		Option is array that contains object and keys, requirement keys is :
		1. input-label : Display text to user that explain main function of current form input
		2. input-name : Text that assign to ID attribute input element and name attribute of input
		3. input-value : Value to assign in form-input
		4. input-type : Type of input. There are 4 input type :
			1. text : common text input
			2. textarea : wide-text input, use for handle long text
			3. number : common number input
			4. checkbox
			5. radio
			if input-type is checkbox or radio, you must create additional keys, it's input-list.
			input-list is array value that contains 'label' and 'value'. 
		Directory of form template is 'template/form.html', and paste to index.html via form element directive 
		**/
		function performVerification(_requirement, _form){
			for(x in _requirement){
				var esense = requirement[x];
				var currentInput = typeof esense.element == "string" ? _form.querySelector(esense.element) : esense.element;
				if(!esense.pattern(currentInput)){
					var notif = interaction.showNotification("Peringatan", esense.message);
				}
			}
			return true;
		}
		var formPanel = document.body.querySelector("formview div").cloneNode(true), handler = {}, databinding = [], requirement;
		console.log("form panel");
		console.log(formPanel);
		formPanel.querySelector(".form-title").innerText = formTitle;
		options.forEach(function(item, index){
			console.log(item);
			var formContainer = formPanel.getElementsByTagName("li")[0]
			, formPlate = formContainer.parentElement
			, inputElement = "";
			if(index > 0) formContainer = formContainer.cloneNode(true);
			var formLabel = formContainer.querySelector(".data-label")		
			, formInput = formContainer.querySelector(".data-input");
			item["input-value"] = item["input-value"] ? item["input-value"] : "";

			formLabel.setAttribute("for", item["input-name"]);
			formLabel.innerText = item["input-label"];
			if(item["input-binding"]) {
				var extraAttr = `input-binding="${item['input-binding']}" input-binding-key="${item['input-binding-key']}" input-binding-message="${item['input-binding-message']}"`;
			}
			switch(item["input-type"]) {
				case "text" :
				case "number" :
				case "password" :
					inputElement = `<input type="${item['input-type']}" id="${item['input-name']}" name="${item['input-name']}" value="${item['input-value']}" data-value="${item['input-value']}" class="container" ${extraAttr}>`;
				break;

				case "textarea" :
					inputElement = `
					<textarea type="${item['input-type']}" id="${item['input-name']}" name="${item['input-name']}" value="${item['input-value']}" data-value="${item['input-value']}" rows="5" cols="50" ${extraAttr}>
					${item['input-value']}
					</textarea>
					`;
				break;

				case "chips" :
					inputElement = `
					<input class="chips-input autocomplete" type="text" id="${item['input-name']}-shot" name="${item['input-name']}" value="${item['input-value']}" data-value="${item['input-value']}" data-source="${item['data-source']}" program-key="${this['program-key']}" program-value="${this['program-value']}">
					<div class="chips-container"></div>
					`;
				break;

				case "select" :
					var options = "";
					item["input-list"].forEach(function(body){
						var value = body[item['program-key']]
						, label = body[item['program-value']];
						options += `<option value="${value}">${label}</option>`;
					});
					inputElement += `<select id="${item['input-name']}" name="${item['input-name']}">${options}</select>`;
				break;

				case "checkbox" :
				case "radio" :
					for(x in item["input-list"]) {
						var listLabel = item["input-list"][x].label
						, listValue = item["input-list"][x].value
						, prefix = item["input-type"] === "checkbox" ? "[]" : "";
						
						inputElement += `
						<div class="half-box row">
						<input type="${item['input-type']}" id="${item['input-name']}" name="${item['input-name']}${prefix}" value="${listValue}" class="mg-right-2">
						<label>${listLabel}</label>
						</div>
						`;
					}
				break;

				case "autocomplete" :
					inputElement = `
					<input class="autocomplete" type="text" id="${item['input-name']}-shot" name="${item['input-name']}" value="${item['input-value']}" data-value="${item['input-value']}" data-source="${item['data-source']}" program-key="${this['program-key']}" program-value="${this['program-value']}">
					`;
				break;
			}

			formInput.innerHTML = inputElement;
			if(/autocomplete/.test(inputElement)){
				var autocompleteEL = formInput.querySelector(".autocomplete")
				, autocomplete = new Awesomplete(autocompleteEL)
				, obtainData = function(label, value){
					console.log(input["input-source"]);
					$http.get(item["input-source"]).error(server.handleError("Obtain data autocomplete", new Function(obtainData(label, value) )))
					.success(function(response){
						if(response.length > 0){
							var data = response.map(function(content){
								var rawData = {
									label : content[label] ? content[label] : "", 
									value :  content[value] ? content[value] : null 
								}

								return rawData;
							});
							autocomplete.list = data;
						}
					});
				};

				if(item["input-type"] == "chips"){
					chipsContainer = formInput.getElementsByClassName("chips-container")[0];
					autocompleteEL.onkeypress = function(event){
						if(event.key == "Enter"){
							event.preventDefault();
							chipsContainer.innerHTML += `
							<div class="turtle-green">
								<span class="pd-2" onclick="this.parentElement.parentElement.removeChild(this.parentElement)" style="cursor:pointer">
									<i class="fa fa-close"></i>
								</span>
								<p>${this.value}</p>
								<input type="hidden" name="${item['input-value']}_${item['input-value']}[]">
							</div>
							`;
						}
					}
					formInput.addEventListener("")
				}
				obtainData(item["input-label"], item["input-value"]);
			}
			if(index > 0) formPlate.appendChild(formContainer);
		});
		// Set up input that have databinding, databinding use for tuning some input-field
		var bindingInput = formPanel.querySelectorAll("[input-binding='true']");
		if(bindingInput.length > 0){
			// Search input that have matching input-binding-key
			bindingInput.forEach(function(content, order){
				var currentKey = content.getAttribute("input-binding-key");
				if(order == 0) databinding.push(currentKey);
				else {
					var isEntry = bindingKeys.every(function(key){
						return key != currentKey;
					});
					console.log(`isEntry = ${isEntry}`);
					if(isEntry === true) databinding.push(currentKey);
				}
			});

		}
		// Handle interaction of chips input
		// Create chip editor
		// allChips = formPanel.getElementsByClassName("chips-input");
		// allChips.forEach(function(item){
		// 	var chipEditor = servant.autocomplete(item);
		// 	chipEditor.onkeypress = function(){
		// 		var searchURL = `${this['data-source']}/${this.value}`
		// 		, that = {};
		// 		console.log(searchURL);
		// 		$http.get(searchURL).error("Searching data ${this['name']}")
		// 		.success(funcftion(data){
		// 			chipEditor.listen({ key : that["program-key"], value : that["program-value"]}, data)
		// 		});
		// 	}
		// });
		// Handle cancel button
		var cancelFormBTN = formPanel.querySelector("[button-control='form-cancel']");
		cancelFormBTN.onclick = function(remote){
			remote.preventDefault();
			var isCancel = confirm("Anda ingin menutup form ini ?");
			if(isCancel == true) {
				formPanel.parentElement.removeChild(formPanel);
			}
		}
		handler.form = formPanel;
		handler.verification = function(_requirement = [{}]){
			requirement = _requirement;
		}
		handler.getData = function(){
			var data = new FormData(formPanel.querySelector("form"));
			return data;
		};
		handler.oninsert = function(submitURL = "", sender = function(){}){
			var insertBTN = formPanel.querySelector("[button-control='form-insert']");
			var isValidDatabinding = databinding.every(function(key){
				var inputBinding = document.querySelectorAll("[input-binding-key='${key}']")
				, comparisonValues = inputBinding.map(function(el){
					return el.value;
				})
				, primaryValue = comparisonValues[0]
				, valueSentence = comparisonValues.join(";;")
				, resultValue = valueSentence.split(primaryValue).join("");
				if(/^;+$/.test(resultValue)) return true;
				else {
					interaction.showNotification("Peringatan", inputBinding[0].getAttribute("input-binding-message"));
					return false;
				}
			});
			var isRelevant = this.performVerification(formPanel.querySelector("form"));
			insertBTN.onclick = function(remote){
				remote.preventDefault();
				var isValidDatabinding = databinding.every(function(key){
					var inputBinding = document.querySelectorAll("[input-binding-key='${key}']")
					, comparisonValues = inputBinding.map(function(el){
						return el.value;
					})
					, primaryValue = comparisonValues[0]
					, valueSentence = comparisonValues.join(";;")
					, resultValue = valueSentence.split(primaryValue).join("");
					if(/^;+$/.test(resultValue)) return true;
					else {
						interaction.showNotification("Peringatan", inputBinding[0].getAttribute("input-binding-message"));
						return false;
					}
				});
				var isRelevant = performVerification(formPanel.querySelector("form"));
				// Send data throught angular $http with method POST
				if(isRelevant && isValidDatabinding){
					var isEntry = confirm("Apakah anda ingin menyimpan data ini ?");
					if(isEntry){
						console.log("Confirmation accepted");
						var material = handler.getData();
						console.log(material);
						var request = {
							method : "POST",
							url : submitURL,
							data : material,
							headers : {
								"Content-Type" : undefined
							}
						}
						// When data submit completed
						function onrespond(res){
							console.log(`${res.status} : ${res.statusText}`);
							if(res.status >= 200 && res.status < 300){
								var result = res.data;
								console.log(result);
								alert("Data berhasil disimpan");
								sender();
							}
							else {
								var insertStatus = res.statusText;
								console.log(insertStatus);
								alert("Data gagal disimpan");
							}
						}

						console.log(submitURL);
						$http(request).then(onrespond, onrespond);
					}
				}
			};
		}
		document.body.appendChild(formPanel);
		return handler;
	}
	this.init = function(formObj){
		// Create saving data on current form with method POST
		var form = new FormData(formObj), that = {}, postData = {};
		for(var content of form.entries()) {
			postData[content[0]] = content[1]
		}

		that.getObjectData = function(){
			return postData;
		}

		that.getStringData = function(){
			stringItem = "";
			for(x in postData){
				stringItem += stringItem != "" ? "&" : "";
				stringItem += `${x}=${postData[x]}`;
			}

			return stringItem;
		}

		that.saveData = function(api){
			var sendCMD = $http.post(api, this.getStringData());
			return sendCMD;
		}
	}
}