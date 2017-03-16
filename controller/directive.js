// -------------------------- DIRECTIVE.JS ---------------------------- //
// Locate this script under controller.js script tag 
// If you want to see logic of this application, open controller.js
app.directive("newquestioncategory", function(){
	return {
		restrict : "E",
		templateUrl : "template/new-question-category.html"
	}
});

app.directive("newquestion", function(){
	return {
		restrict : "E",
		templateUrl : "template/new-question.html"
	}
});
app.directive("newquestionrow", function(){
	return {
		restrict : "E",
		templateUrl : "template/new-question-row.html"
	}
});
app.directive("newactivemenu", function(){
	return {
		restrict : "E",
		templateUrl : "template/new-active-menu.html"
	}
});
app.directive("viewdata", function(){
	return {
		restrict : "E",
		templateUrl : "template/view-data.html"
	}
});
app.directive("formview", function(){
	return {
		restrict : "E",
		templateUrl : "template/form.html"
	}
});