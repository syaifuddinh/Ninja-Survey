app.controller("surveyController", surveyControllerInit);
// Function reportControllerInit, handle all interaction in the page of reporting
function surveyControllerInit($http, server, servant, interaction, viewer, insertSurvey) {
	window.insertMenu("Manage Survey");
	var surveyContainer = document.querySelector(".view-survey")
	, surveyHandler = viewer.init("Data survey");
	surveyHandler.setColumnHead("Nama survey", "Deskripsi", "Tanggal dibuat", "Status");
	surveyHandler.setAction("survey/update");
	var viewResponden = surveyHandler.createViewer(`${server.viewURL()}/survey/view`);
	viewResponden.see([["nama_survey", "Nama survey"], ["deskripsi", "Deskripsi"], ["time_created", "Tanggal dibuat"], ["status", "Status"]]);
	viewResponden.load();
	var searchURL = `${server.viewURL()}/survey/view/keyword`;
	console.log(searchURL);
	viewResponden.search(searchURL);
	// View rekap survey
	var rekapSurveyURL = `${server.viewURL()}/summary`;
	console.log(`Rekap survey URL : ${rekapSurveyURL}`);
	(function obtainRekapSurvey(){
		$http.get(rekapSurveyURL)
		.error(server.handleError("Rekap survey", obtainRekapSurvey))
		.success(function(data){
			console.log("Sukses mendapatkan rekap survey");
			surveyHandler.addExplanation("active_survey_amount", `Ada <b>${data.active_survey_amount} survey</b> yang berstatus aktif`);
			surveyHandler.addExplanation("non_active_survey_amount", `Ada <b>${data.non_active_survey_amount} survey</b> yang berstatus tidak aktif`);
			surveyHandler.addExplanation("survey_amount", `Ada <b>${data.survey_amount} survey</b> yang tersedia`);
			surveyHandler.addExplanation("question_category_amount", `Ada <b>${data.question_category_amount} kategori pertanyaan</b> yang tersedia`);
			surveyHandler.addExplanation("question_amount", `Ada <b>${data.question_amount} pertanyaan</b> pertanyaan yang tersedia`);
			surveyHandler.addExplanation("answer_amount", `Ada <b>${data.answer_amount} jawaban</b> jawaban yang tersedia`);
		});
	})();
	// Hemat memori
	rekapSurveyURL = null;
	// Create insert survey button
	var insertSurveyBTN = surveyHandler.insertButtonInit("Insert survey");
	insertSurveyBTN.onclick = function(){
		insertSurvey.init();
	};
	insertSurveyBTN.title = "Insert new survey";

	surveyContainer.appendChild(surveyHandler.document);
	servant.toggleLoader(false);
}