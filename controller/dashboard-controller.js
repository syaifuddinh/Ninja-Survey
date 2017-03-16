app.controller("dashboardController", dashboardControllerInit);
// Dashboard controller, handle all interaction in the page of dashboard
function dashboardControllerInit(viewer, server, $http, servant, insertSurvey, insertUser){
	obj = [{"id":7,"no_ktp":"1433333333","nama_user":"Riko juniansyah","no_telepon":"083200231","gender":"pria","nama_level_user":"admin"},{"id":1,"no_ktp":"1422222222","nama_user":"Eliana Kartika sari","no_telepon":"031928321","gender":"pria","nama_level_user":"surveyor"},{"id":13,"no_ktp":"14211111111","nama_user":"","no_telepon":"08319400324","gender":"wanita","nama_level_user":"user"},{"id":14,"no_ktp":"1420000000","nama_user":"Aldi irawan","no_telepon":"021339000343","gender":"pria","nama_level_user":"user"},{"id":2,"no_ktp":"1400399001","nama_user":"Evrita Megawati","no_telepon":"081230098","gender":"wanita","nama_level_user":"surveyor"},{"id":6,"no_ktp":"14230042352","nama_user":"Ali Murtadlo","no_telepon":"083292003","gender":"pria","nama_level_user":"admin"},{"id":4,"no_ktp":"1400325392","nama_user":"Khoirul DPP ","no_telepon":"024234222","gender":"pria","nama_level_user":"user"},{"id":5,"no_ktp":"14523000342","nama_user":"Egha rodhu hansyah","no_telepon":"083200916","gender":"pria","nama_level_user":"user"}];
	console.log(obj);
	servant.toggleLoader(false);
	server.checkUp();
	// Declare all card menu at dashboard
	var surveyCard = document.getElementById("survey-card")
	, reportCard = document.getElementById("report-card")
	, userCard = document.getElementById("user-card")
	, questionCard = document.getElementById("question-card")
	, respondenCard = document.getElementById("responden-card")
	, createSurveyBTN = document.querySelector("[button-control='create-survey']")
	, createUserBTN = document.querySelector("[button-control='create-user']");

	function openSurveyPage() {
		servant.toggleLoader();
		console.log("index.html#view-survey");
		location.href = "index.html#view-survey";
	}
	function openQuestionPage() {
		servant.toggleLoader();
		console.log("index.html#view-question");
		location.href = "index.html#view-question";
	}
	function openRespondenPage() {
		servant.toggleLoader();
		console.log("index.html#view-responden");
		location.href = "index.html#view-responden";
	}
	function openReportPage() {
		servant.toggleLoader();
		console.log("index.html#view-report");
		location.href = "index.html#view-report";
	}
	function openUserPage() {
		servant.toggleLoader();
		console.log("index.html#view-user");
		location.href = "index.html#view-user";
	}

	// Append click handler or each card menu
	surveyCard.addEventListener("click", openSurveyPage);
	respondenCard.addEventListener("click", openRespondenPage);
	userCard.addEventListener("click", openUserPage);
	questionCard.addEventListener("click", openQuestionPage);
	reportCard.addEventListener("click", openReportPage);
	createSurveyBTN.onclick = function(){
		insertSurvey.init();
	};
	createUserBTN.onclick = function(){
		insertUser.init();
	};

	// Add some summary to side panel
	var summaryAPI = `${server.viewURL()}/summary`;
	console.log(summaryAPI);
	(function obtainSummary(){
		x = $http.get(summaryAPI);
		console.log(x.__proto__.__proto__);
		$http.get(summaryAPI).error(server.handleError("Get summary", obtainSummary))
		.success(function(data){
			// Declare all explanation for display to user
			var explanation = { 
				  activeSurveyExplain : `Ada <b>${data.active_survey_amount} survey</b> yang berstatus aktif`
				, nonActiveSurveyExplain : `Ada <b>${data.non_active_survey_amount} survey</b> yang berstatus non-aktif`
				, allSurveyExplain : `Ada <b>${data.survey_amount} survey</b> yang tersedia`
				, questionCategoryExplain : `Ada <b>${data.question_category_amount} survey</b> yang tersedia`
				, questionExplain : `Ada <b>${data.question_amount} pertanyaan</b> yang tersedia`
				, answerExplain : `Ada <b>${data.question_amount} jawaban</b> yang tersedia`
			};

			// Append all explanation to side-panel
			indexExplain = Object.keys(explanation).entries();
			var bannerPlace = document.querySelectorAll(".panel-content li");
			bannerPlace.forEach(function(item, index){
				var currentIndex = indexExplain.next().value[1]
				, currentExplain = explanation[currentIndex];
				item.innerHTML = currentExplain ? currentExplain : "";
			});
		});
	})();
	
}