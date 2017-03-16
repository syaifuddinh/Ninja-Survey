app.service("collectingServant", ["interaction", collectingServantInit]);
// Dependency of collecting-controller.js
function collectingServantInit(interaction){
	this.init = function() {
		var saveSurveyBTN = document.body.querySelector("[button-control='save-survey']")
		, cancelBTN = document.body.querySelector("[button-control='cancel-survey']");
		// When user click cancel button
		cancelBTN.onclick = function() {
			var isCancel = confirm("Apakah anda yakin ingin membatalkan survey ini ?");
			if(isCancel) {
				interaction.toggleLoader();
				location.href = "index.html";
			}
		}
		// When user click save survey button
		saveSurveyBTN.onclick = function(){

		}
	};
}