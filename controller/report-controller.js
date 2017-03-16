app.controller("reportController", reportControllerInit);
// Function reportControllerInit, handle all interaction in the page of reporting
function reportControllerInit($http, server, servant, interaction, viewer) {
	window.insertMenu("View Report");
	var viewContainer = document.getElementsByClassName("view-report")[0]
	, reportHandler = viewer.init("REPORT DATA")
	, contentWrapper = reportHandler.document.querySelector(".content-wrapper")
	, obtainSurveyURL = `${server.viewURL()}/survey/view`;

	contentWrapper.classList.add("pd-3")
	contentWrapper.innerHTML = `
	<div class="row option-wrapper">
		<select id="survey-option"></select>
		<hr class="mg-top-half>
	</div>
	`;
	console.log(obtainSurveyURL);
	(function obtainSurvey(){
		$http.get(obtainSurveyURL).error(server.handleError("Obtain survey"), obtainSurvey)
		.success(function(data){
			var optionItem = "";
			data.forEach(function(item){
				optionItem += `<option value='${item.id}'>${item.nama_survey}</option>`;
			});
			// Append option item to survey dropdown list
			var surveyOption = contentWrapper.querySelector("#survey-option");
			surveyOption.innerHTML = optionItem;
			surveyOption.onchange = function(){
				// Body function....
			}
			viewContainer.appendChild(reportHandler.document);
			window.toggleLoader(false);
		});
	})();
}