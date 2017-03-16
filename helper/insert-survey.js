app.service("insertSurvey", ["$http", "server", "inserting", insertSurveyInit]);
// Dashboard controller, handle all interaction in the page of dashboard
function insertSurveyInit($http, server, inserting){
	this.init = function(){
		var fields = [
			{
				"input-label" : "Nama survey",
				"input-type" : "text",
				"input-name" : "survey-name",
				"input-value" : arguments[0] ? arguments[0] : "" 
			},
			{
				"input-label" : "Deskripsi",
				"input-type" : "textarea",
				"input-name" : "survey-description",
				"input-value" : arguments[1] ? arguments[1] : ""
			},
			{
				"input-label" : "Status",
				"input-type" : "radio",
				"input-name" : "survey-status",
				"input-value" : arguments[2] ? arguments[2] : "",
				"input-list" : [{ label : "Aktif", value : "aktif"}, { label : "Non-aktif", value : "non-aktif"}]
			},
			{
				"input-label" : "Surveyor yang bertanggung jawab",
				"input-type" : "chips",
				"input-name" : "survey-handler",
				"input-source" : `${server.viewURL}/user/view-level-user`,
				"input-label" : "nama_level_user",
				"input-value" : "id",
			}
		];
		surveyForm = inserting.loadView("Create new survey", fields);
		surveyForm.oninsert(function(){
			var insertData = new FormData(surveyForm);
		});	
	}
}