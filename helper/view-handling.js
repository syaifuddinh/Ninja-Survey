// HANDLING VIEW DATA TABLE
app.service("viewer", ["$http", "server", "interaction", viewerInit]);
// function for handling data loaded
function viewerInit($http, server, interaction){
	this.init = function(titleName){
		var that = {};
		that.document = document.querySelector("viewdata div").cloneNode(true);
		// Set page title
		that.document.getElementsByClassName("page-title")[0].innerText = titleName;
		that.setAction = function(path){
			// Set url for update data
			var forms = this.document.querySelectorAll("tbody tr");
			forms.forEach(function(currentRow){
				currentRow.setAttribute("action-path", path);
			});
		}
		that.addExplanation = function(dataControl, content){
			var explanation = this.document.querySelectorAll(".explanation li");
			for(x in explanation) {
				var currentExplanation = explanation[x];
				if(currentExplanation.innerText == ""){
					currentExplanation.setAttribute("data-control", dataControl);
					currentExplanation.innerHTML = content;
					break;
				}
				else if(x == explanation.length - 1 && currentExplanation != ""){
					var newExplanation = currentExplanation.cloneNode(true);
					newExplanation.setAttribute("data-control", dataControl);
					newExplanation.innerHTML = content;
					currentExplanation.parentElement.appendChild(newExplanation);
				}				
			}
		}

		that.editExplanation = function(dataControl, content){
			explanationTarget = this.document.querySelector(`.explanation li[data-control='${dataControl}']`);
			console.log(explanationTarget);
			if(explanationTarget){
				explanationTarget.innerHTML = content;
			}
		}

		that.insertButtonInit = function(title = ""){
			// Create insert button
			console.log(`Button init : ${title}`);
			var topRightMenu = this.document.querySelector(".right-panel")
			, insertUserBTN = document.createElement("button");
			insertUserBTN.classList.add('waterboom');
			insertUserBTN.innerText = title;
			topRightMenu.appendChild(insertUserBTN);

			return insertUserBTN;
		}
		// Set columns
		that.setColumnHead = function(){
			var columnLength = arguments.length
			, columns = arguments
			, columnHead = this.document.querySelectorAll("thead tr td")
			, trashColumn = 0;
			console.log(columnHead);
			columnHead.forEach(function(item, index){
				if(columns[index]){
					item.innerText = columns[index];
				}
				else {
					trashColumn++;
					item.parentElement.removeChild(item);
				}
			});
			console.log(`Trash column : ${trashColumn}`);
			// Remove trash column in the tbody
			if(trashColumn > 0) {
				var bodyRow = that.document.querySelectorAll("tbody tr");
				console.log(`Jumlah baris : ${bodyRow.length}`);
				bodyRow.forEach(function(item, idx){
					var currentColumns = item.getElementsByTagName("td");
					// Delete trash column in tbody
					for(x = 0;x < trashColumn;x++){
						var currentColumn = currentColumns[6 - x];
						item.removeChild(currentColumn);
					}					
				});
			}
		}
		// Display content to body table
		that.createViewer = function(api){
			var handler = {}
			, rows = this.document.querySelectorAll("tbody tr")
			, viewAPI = api
			, displayColumn
			, primaryKey;

			console.log(viewAPI);
			handler.see = function(columns = [[]]){
				// Display column must be 2 dimensional array
				displayColumn = columns;
			}
			// Set primary key
			handler.key = function(column = "id") {
				primaryKey = column;
			}

			handler.load = function(url = viewAPI){
				var information = {
					method : "GET",
					url : url,
				}

				function onsuccess(res){
					data = res.data;
					rows.forEach(function(item, index){
						// Add reference ID to current row'
						var currentColumns = item.getElementsByTagName("td");
						if(data[index]) {	
							var referenceEl = item.querySelector("input[type='hidden']");
							referenceEl.value = data[index].id;
							entryColumn = displayColumn.entries();
							currentColumns.forEach(function(content, count){
								var currentColumnKey = entryColumn.next().value[1][0];
								content.innerText = data[index][currentColumnKey];
								content.setAttribute("name", currentColumnKey);
							});
						}
						else {
							if(item.innerText != ""){
								currentColumns.forEach(function(content){
									content.innerText = "";
								});
							}
						}
					});
					interaction.injectAllEditor(that.document, server.viewURL());
				}
				(function obtainData(){
					$http(information).then(onsuccess, server.handleError("Get data", obtainData));
				})();	
				// $http.get(url).error(server.handleError("Get data"))
				// .success(function(data){
				// 	rows.forEach(function(item, index){
				// 		// Add reference ID to current row'
				// 		var currentColumns = item.getElementsByTagName("td");
				// 		if(data[index]) {	
				// 			var referenceEl = item.querySelector("input[type='hidden']");
				// 			referenceEl.value = data[index].id;
				// 			entryColumn = displayColumn.entries();
				// 			currentColumns.forEach(function(content, count){
				// 				var currentColumnKey = entryColumn.next().value[1][0];
				// 				content.innerText = data[index][currentColumnKey];
				// 				content.setAttribute("name", currentColumnKey);
				// 			});
				// 		}
				// 		else {
				// 			if(item.innerText != ""){
				// 				currentColumns.forEach(function(content){
				// 					content.innerText = "";
				// 				});
				// 			}
				// 		}
				// 	});
				// 	interaction.injectAllEditor(that.document, server.viewURL());
				// });
			}

			handler.search = function(api){
				// API is url for connect to server
				// It must be contains "keyword" word in the string of API
				var searchingText = that.document.querySelector(".searching-text")
				, searchButton = that.document.querySelector(".search-button");
				// Searching data
				function searchingData(){
					var searchingURL = api.replace(/(.*)(keyword)(.*)/, `$1${searchingText.value}$3`);
					console.log(searchingURL);
					handler.load(searchingURL);
				}
				searchButton.addEventListener("click", searchingData);
				searchingText.addEventListener("keypress", function(event){
					if(event.key == "Enter"){
						searchingData();
					}
				})
			}

			return handler;
		}

		return that;
	}
}