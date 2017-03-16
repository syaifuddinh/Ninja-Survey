// -------------------------- ROUTE.JS ---------------------------- //
// Locate this script under directive.js script tag 
// If you want to see logic of this application, open controller.js

app.config(function($routeProvider){
	$routeProvider
	.when("/", { 
		templateUrl : "page/dashboard.html",
		controller : "dashboardController"
	})
	.when("/view-question", { 
		templateUrl : "page/view-question.html",
		controller : "questionController"
	})
	.when("/view-user", { 
		templateUrl : "page/view-user.html",
		controller : "userController"
	})
	.when("/view-survey", { 
		templateUrl : "page/view-survey.html",
		controller : "surveyController"
	})
	.when("/view-report", { 
		templateUrl : "page/view-report.html",
		controller : "reportController"
	})
	.when("/view-responden", { 
		templateUrl : "page/view-responden.html",
		controller : "respondenController"
	})
	.when("/login", { 
		templateUrl : "page/login.html",
		controller : "loginController"
	})
	.when("/collect-data", { 
		templateUrl : "page/collect-data.html",
		controller : "collectingController"
	});
});
