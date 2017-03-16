// SERVER.JS
// Define detail of server
app.service("server", ["$http","DBCommand", "interaction", "servant", loadserver]);
function loadserver($http, DBCommand, interaction, servant){
	var host = "localhost"
	, path = "easy-survey"
	, protocol = "http";
	// View complete url
	this.viewURL = function(){
		return `${protocol}://${host}/${path}`;
	}
	this.handleError = function(point = "", repetitiveHandler = new Function(), preInfo){
		point = point != "" ? `${point} error : ` : point;
		return function(data){
			console.log(`${point}Error when get data from server`);
			DBCommand.insert("pending_data", preInfo)
			repetitiveHandler();
		}	
	}	
	// Mem-validasi apakah user sudah login atau belum
	this.checkUp = function(username = "", password = ""){
		var userData = DBCommand.view("participants", 1),
		logoutWrapper = document.querySelector(".logout-wrapper");
		if(!userData){
			location.href = "index.html#login";
		}
		else {
			userData.onsuccess = function(event){
				if(!this.result) {
					if(!logoutWrapper.classList.contains("hidden")) logoutWrapper.classList.add("hidden");
					location.href = "index.html#login";
				}
			}

			userData.onerror = function(event){
				console.log("Error when get user data from database");
				console.log(event);
				if(!logoutWrapper.classList.contains("hidden")) logoutWrapper.classList.add("hidden");
				location.href = "index.html#login";
			}
		}
	}
	// Meng-handle login user
	this.checkIn = function(username = "", password = ""){
		console.log("Login");
		username = username.trim();
		password = password.trim();
		if(username != "" && password != "") {
			var url = `${this.viewURL()}/check-in/${username}/${password}`;
			console.log(url);
			$http.get(url)
			.success(function(data){
				if(data.result > 0){
					// If user can pass verification
					if(logoutWrapper.classList.contains("hidden")) logoutWrapper.classList.remove("hidden");
					DBCommand.insert("participants", {
						"username" : username,
						"password" : password
					});
					var notif = interaction.showNotification("Anda berhasil login");
					location.href = "index.html#";
				}
				else {
					var notif = interaction.showNotification("Username atau password anda salah");
					servant.toggleLoader(false);
				}
			})
			.error(function(error){
				// Error when fail to connect to database
				console.log("Error when retrieving data user for check-in at database");
				console.log(error);
			});
		}
	}
}