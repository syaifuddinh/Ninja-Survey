app.service("insertUser", ["$http", "server", "inserting", insertUserInit]);
// Dashboard controller, handle all interaction in the page of dashboard
function insertUserInit($http, server, inserting){
	this.init = function(){
		var levelUserAPI = `${server.viewURL()}/user/view-level-user`
		, argument = arguments;
		console.log(argument);
		console.log(levelUserAPI);
		$http.get(levelUserAPI).error(server.handleError("Get level user"))
		.success(function(levelUserContent){
			var fields = [
				{
					"input-label" : "Username",
					"input-type" : "text",
					"input-name" : "username",
					"input-value" : argument[0] ? argument[0] : "" 
				},
				{
					"input-label" : "Password",
					"input-type" : "password",
					"input-name" : "password",
					"input-value" : argument[1] ? argument[1] : "",
					"input-binding" : "true",
					"input-binding-key" : "password",
					"input-binding-message" : "Password tidak cocok dengan password konfirmasi"
				},
				{
					"input-label" : "Konfirmasi password",
					"input-type" : "password",
					"input-name" : "password-confirm",
					"input-value" : argument[1] ? argument[1] : "",
					"input-binding" : "true",
					"input-binding-key" : "password",
					"input-binding-message" : "Password tidak cocok dengan password konfirmasi"
				},
				{
					"input-label" : "No KTP",
					"input-type" : "text",
					"input-name" : "no-ktp",
					"input-value" : argument[2] ? argument[2] : ""
				},
				{
					"input-label" : "Nama lengkap",
					"input-type" : "text",
					"input-name" : "user-fullname",
					"input-value" : argument[3] ? argument[3] : ""
				},
				{
					"input-label" : "Alamat",
					"input-type" : "textarea",
					"input-name" : "address",
					"input-value" : argument[4] ? argument[4] : ""
				},
				{
					"input-label" : "No telepon",
					"input-type" : "text",
					"input-name" : "phone-number",
					"input-value" : argument[5] ? argument[5] : ""
				},
				{
					"input-label" : "Gender",
					"input-type" : "radio",
					"input-name" : "gender",
					"input-list" : [{ label : "Pria", value : "pria"}, { label : "Wanita", value : "wanita"}]
				},
				{
					"input-label" : "Level user",
					"input-type" : "select",
					"input-name" : "level-user",
					"input-list" : levelUserContent,
					"program-key" : "id",
					"program-value" : "nama_level_user"
				}
			]; 
			UserForm = inserting.loadView("Create new User", fields);
			// Set validation of value in each input element
			var requirement = [
				{
					"element" : "#username",
					"pattern" : /.+/,
					"message" : "Anda harus mengisi username dengan benar"
				},
				{
					"element" : "#password",
					"pattern" : /.+/,
					"message" : "Anda harus mengisi password dengan benar"
				},
				{
					"element" : "#user-fullname",
					"pattern" : /.+/,
					"message" : "Anda harus mengisi nama lengkap dengan benar"
				},
				{
					"element" : "#no-ktp",
					"pattern" : /.+/,
					"message" : "Anda harus mengisi no ktp dengan benar"
				},
				{
					"element" : "#address",
					"pattern" : /.+/,
					"message" : "Anda harus mengisi alamat dengan benar"
				},
			]
			// Set insert handler
			var sendUserURL = `${server.viewURL()}/user/insert/`;
			console.log(sendUserURL);
			UserForm.oninsert(sendUserURL);
		});
	}
}