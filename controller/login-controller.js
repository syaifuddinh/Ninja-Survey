app.controller("loginController", loginControllerInit);
// Handle all interaction in page of login
function loginControllerInit($http, interaction, server, servant){
	servant.toggleLoader(false);
	var username = document.loginForm.username
	, password = document.loginForm.password;

	document.loginForm.loginSubmit.onclick = function(event){
		event.preventDefault();
		if(username.value != "") {
			if(password.value != "") {
				servant.toggleLoader();
				server.checkIn(username.value, password.value);
			}
			else {
				interaction.showNotification("Peringatan", "Anda harus mengisi password !");	
			}
		}
		else {
			interaction.showNotification("Peringatan", "Anda harus mengisi username !");
		}
	}
}