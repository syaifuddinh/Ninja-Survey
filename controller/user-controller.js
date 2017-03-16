app.controller("userController", userControllerInit);
// Function userControllerInit, handle all interaction in the page of user
function userControllerInit($http, server, servant, viewer, insertUser){
	window.insertMenu("Manage User");
	var userHandler = viewer.init("DATA USER");
	// Set URL for handle data updating
	userHandler.setAction("user/update");
	// General instalation
	userHandler.setColumnHead("No KTP", "Nama user", "Gender", "No telepon", "Level user");
	// View rekap user
	var rekapUserURL = `${server.viewURL()}/user/rekap`;
	console.log(`Rekap user URL : ${rekapUserURL}`);
	// Send data via angular $http
	$http.get(rekapUserURL)
	.error(server.handleError("Rekap user"))
	.success(function(data){
		console.log("Sukses mendapatkan rekap user");
		userHandler.addExplanation("account_amount", `Ada <b>${data.account_amount} akun</b> yang telah terdaftar`);
		userHandler.addExplanation("admin_amount", `Ada <b>${data.admin_amount} akun</b> yang berstatus <b>admin</b>`);
		userHandler.addExplanation("user_amount", `Ada <b>${data.user_amount} akun</b> yang berstatus <b>user</b>`);
		userHandler.addExplanation("surveyor_amount", `Ada <b>${data.surveyor_amount} akun</b> yang berstatus <b>surveyor</b>`);
	});
	// Hemat mempri
	rekapUserURL = null;
	// Create insert user button
	var insertUserBTN = userHandler.insertButtonInit("Insert User");
	insertUserBTN.onclick = function(){
		insertUser.init();
	};
	insertUserBTN.title = "Insert new user";
	// Create table
	var viewUser = userHandler.createViewer(`${server.viewURL()}/user/view`);
	viewUser.see([["no_ktp", "No KTP"], ["nama_user", "Nama user"], ["gender", "Gender"], ["no_telepon", "No telepon"], ["nama_level_user", "Level user"]]);
	viewUser.load();
	viewUser.search(`${server.viewURL()}/user/view/keyword`);
	// Display HTML View
	var viewContainer = document.querySelector(".view-user");
	viewContainer.appendChild(userHandler.document);
	servant.toggleLoader(false);
}
