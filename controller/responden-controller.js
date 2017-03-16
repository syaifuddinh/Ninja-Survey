app.controller("respondenController", respondenControllerInit);
// Function reportControllerInit, handle all interaction in the page of reporting
function respondenControllerInit(server, servant, interaction) {
	var respondenHandler = viewer.init("Data responden")
	respondenHandler.setColumnHead("No KTP", "Nama responden", "Gender", "No telepon", "Level responden");
	// View rekap responden
	var rekaprespondenURL = `${server.viewURL()}/responden/rekap`;
	console.log(rekaprespondenURL);
	console.log(server.handleError("Rekap responden"));
	$http.get(rekaprespondenURL).error(server.handleError("Rekap responden"))
	.success(function(data){
		console.log("Sukses mendapatkan rekap responden");
		viewer.addExplanation("account_amount", `Ada <b>${data.account_amount}</b> akun yang telah terdaftar`);
		viewer.addExplanation("admin_amount", `Ada <b>${data.admin_amount}</b> akun yang berstatus <b>admin</b>`);
		viewer.addExplanation("responden_amount", `Ada <b>${data.responden_amount}</b> akun yang berstatus <b>responden</b>`);
		viewer.addExplanation("surveyor_amount", `Ada <b>${data.surveyor_amount}</b> akun yang berstatus <b>surveyor</b>`);
	});
	// Hemat mempri
	rekaprespondenURL = null;
	// Create insert responden button
	var topRightMenu = respondenHandler.document.querySelector("right-panel")
	, insertRespondenBTN = document.createElement("button");
	insertRespondenBTN.classList.add('waterboom');
	insertRespondenBTN.onclick = insertResponden.init;
	topRightMenu.appendChild(insertRespondenBTN);
	// Create table
	var viewResponden = RespondenHandler.createViewer(`${server.viewURL()}/responden/view`);
	viewResponden.see([["no_ktp", "No KTP"], ["nama_responden", "Nama responden"], ["gender", "Gender"], ["no_telepon", "No telepon"]]);
	viewResponden.load();
	viewResponden.search(`${server.viewURL()}/responden/view/keyword`);
	// Display HTML View
	var viewContainer = document.querySelector(".view-responden");
	viewContainer.appendChild(respondenHandler.document);
	servant.toggleLoader(false);
}