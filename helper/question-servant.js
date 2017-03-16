// QUESTION-SERVANT.JS
// Dependency of question-controller.js

app.service("questionServant", ["$http", "server", "interaction", questionServantInit]);
function questionServantInit($http, server, interaction){
	this.on = function() {
		var allQuestionBoard = document.getElementsByClassName("new-question");
		allQuestionBoard.forEach(function(item){
			// Initialize save button
			var saveQuestionBTN = item.querySelector(".save-question");
			function toggleSaver(turnOn = true){
				if(turnOn) {
					if(saveQuestionBTN.classList.contains("hidden")) saveQuestionBTN.classList.remove("hidden")
				}
				else {
					if(!saveQuestionBTN.classList.contains("hidden")) saveQuestionBTN.classList.add("hidden")
				}
			}
			// Initialize question-id from current question
			var questionID = item.getAttribute("question-id");
			// First, this code block handle removing each question
			var removeQuestionButton = item.querySelector("[button-control='remove-question']");
			removeQuestionButton.onclick = function(){
				var isRemove = confirm("Apakah anda ingin menghapus pertanyaan ini ?");
				if(isRemove) {
					item.parentElement.removeChild(item);
				}
			}		
			// ====================================================

			// Second, this code block create new answer for each question	
			var newAnswerButtons = item.querySelector("[button-control='remove-question']");
			newAnswerButtons.onclick = function(){
				var tipeJawaban = item.getAttribute("tipe-jawaban");
				switch(tipeJawaban) {
					case "checklist" :
					case "pilihan-ganda" :
						toggleSaver();
						var answerList = item.querySelector(".answer-list");
						// Answer box & answer text input
						var answerBox = document.createElement("div")
						, answerInput = document.createElement("input");
						answerBox.classList.add("half-box");
						answerInput.setAttribute("type", "text");
						answerBox.appendChild(answerInput);
						// Handle answer saving
						function answerSaving(textInput){
							var insertAnswerAPI = `${server.viewURL()}/pertanyaan/insert-jawaban/${textInput.value}/${questionID}`;
							console.log(insertAnswerAPI);
							$http.get(insertAnswerAPI).error(server.handleError("Insert answer"))
							.success(function(){
								alert("Jawaban berhasil tersimpan");
								answerBox.innerHTML = textInput.value;
								saveQuestionBTN.onclick = null;
							});
						}
						answerList.onkeypress = function(event){
							if(event.key == "Enter") {
								answerSaving();
							}
						}

						saveQuestionBTN.onclick = function(){
							answerSaving();
						}
					break;

					case "isian" :
						alert("Pertanyaan ini tipe jawabannya adalah 'isian', jadi tidak bisa menambah jawaban lagi");
					break;
				}

			}	
			// =======================================================
		});
	}
}
