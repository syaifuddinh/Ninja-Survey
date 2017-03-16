app.controller("questionController", questionControllerInit);
// Set up all interaction in question page
function questionControllerInit($http, server, servant, questionServant, interaction){
	function insertAnswer(form, answerType){
		if(answerType == "checklist" || answerType == "pilihan ganda") {
			var answerWrapper = form.querySelector(".answer-list");
			answerWrapper.innerHTML += `
				<div class="half-box">
					<span contenteditable='true' name='answers[]'>Tulis jawaban disini....</span>
				</div>
			`;
			var answerEditor = answerWrapper.querySelector("[name='answers[]']");
			interaction.injectParticularEditor(form, answerEditor)/
			answerEditor.focus();
		}
		else if(answerType == "isian") {
			interaction.showNotification("Peringatan", "Tipe jawaban berupa isian, bukan berupa checklist ataupun pilihan ganda");
		}
	}

	function removeQuestionPanel(target){
		var notice = `Anda akan menghapus pertanyaan "${target.querySelector('.question-name').innerText}".\nApakah anda ingin menghapus pertanyaan ini`;
		var isRemove = confirm(notice);
		if(isRemove) {
			var form = new FormData();
			// Input which contain question id
			var questionId = target.querySelector("[name='id-pertanyaan']");
			// Absolute question id
			questionId = question.value;
			form.append("id", questionId);
			preInfo = {
				method : "POST",
				url : "${server.viewURL()}",
				data : form
				headers : {
					"Content-Type" : undefined
				}
			}

			function onsuccess(){
				target.parentElement.removeChild(target);
			}
			$http(preInfo).then(onsuccess, server.handleError("Remove data", sendRemoveData));
			target.parentElement.removeChild(target);
		}
	}
	window.insertMenu("Manage question");
	var obtainSurveyURL = `${server.viewURL()}/survey/view`;
	(function obtainSurvey(){
		$http.get(obtainSurveyURL).error(server.handleError("Obtain survey"), obtainSurvey)
		.success(function(data){
			var optionItem = "";
			data.forEach(function(item){
				optionItem += `<option value='${item.id}'>${item.nama_survey}</option>`;
			});
			// Append option item to survey dropdown list
			var surveyWrapper = document.querySelector("#surveys");
			surveyWrapper.innerHTML = optionItem;
			surveyWrapper.onchange = function(){
				// Body function....
			}
		});
	})();
	var questionTypeAPI = `${server.viewURL()}/kategori-pertanyaan/view`;
	// Get all type question from server
	var mainContainer = document.querySelector(".new-questions");
	$http.get(questionTypeAPI)
	.error(server.handleError("Question category"))
	.success(function(data){
		if(data.length < 1) $scope.isHide = true;
		else {
			data.forEach(function(item, index){
				var mainboard = document.querySelector("newquestioncategory div").cloneNode(true)
				, listQuestion = mainboard.querySelector(".list-question")
				, questionCategoryID = item.id;
				// Set id category
				var currentFormCategory = mainboard.querySelector("form");
				currentFormCategory.innerHTML += `<input type="hidden" name="id" value="${item.id}">`;
				// Give numbering
				mainboard.querySelector(".number-label").innerText = index + 1; 
				// Append question category
				questionCategory = mainboard.querySelector(".question-category-label");
				questionCategory.innerText = item.nama_tipe_pertanyaan;
				// Load all question or current question category
				var questionAPI = `${server.viewURL()}/pertanyaan/view/${questionCategoryID}/`;
				console.log(questionAPI);
				$http.get(questionAPI)
				.error(server.handleError("Question"))
				.success(function(questions){
					for(x in questions){
						var quest = questions[x]
						, questionBoard = document.querySelector("newquestion div").cloneNode(true)
						, questionForm = questionBoard.querySelector("form")
						, questionSaveBTN = questionBoard.querySelector(".save-question")
						, answerType = questionBoard.querySelector(".answer-type")
						, answerList = questionBoard.querySelector(".answer-list");
						// Set id kategori pertanyaan & id pertanyaan
						questionForm.innerHTML += `<input type="hidden" name="id-kategori-pertanyaan" value="${item.id}">`;
						questionForm.innerHTML += `<input type="hidden" name="id-pertanyaan" value="${quest.id}">`;
						// Append data question
						questionBoard.querySelector(".question-name").innerHTML = quest.nama_pertanyaan;
						questionBoard.querySelector(".answer-type-board").innerHTML = quest.nama_tipe_jawaban;
						if(!questionSaveBTN.classList.contains("hidden")) questionSaveBTN.classList.add("hidden");
						// When user click insert answer button
						questionBoard.querySelector("[button-control='create-new-answer']").onclick = function(event){
							event.preventDefault();
							insertAnswer(questionForm, quest.nama_tipe_jawaban);
						}
						questionBoard.querySelector("[button-control='remove-question']").onclick = function(event){
							event.preventDefault();
							removeQuestionPanel(questionBoard);
						}
						// When user inserting data
						function insertQuestion(){
							var questionText = questionBoard.querySelector("question-text")
							, insertQuestionAPI = `${server.viewURL()}/question-kategori/${questionText.value}/`;
						}
						listQuestion.appendChild(questionBoard);
					}
					interaction.injectEditor(mainboard, server.viewURL());
				});
				// Append questionCategory to mainContainer
				mainContainer.appendChild(mainboard);
				servant.toggleLoader(false);
			});
		}	
	});	
	// Create new question category
	newQuestionCategoryBTN = mainContainer.querySelector("[button-control='create-new-question-category']");
	newQuestionCategoryBTN.onclick = function(){
		var mainboard = document.querySelector("newquestioncategory div").cloneNode(true)
		, listQuestion = mainboard.querySelector(".list-question")
		, questionCategoryForm = mainboard.querySelector("form");
		questionCategoryForm.setAttribute("action-path", "kategori-pertanyaan/insert")
		// Set id category
		var currentFormCategory = mainboard.querySelector("form");
		// Give numbering
		var numbers = mainContainer.getElementsByClassName(".number-label");
		var numbers = numbers.map(new Function("decimal", "return decimal.innerText;"));
		var incrementedNumber = Math.max.apply(this, numbers);
		mainboard.querySelector(".number-label").innerText = incrementedNumber; 
		// Append question category
		questionCategory = mainboard.querySelector(".question-category-label");
		questionCategory.innerText = "Tulis sebuah kategori pertanyaan.....";
		var questionBoard = document.querySelector("newquestion div").cloneNode(true)
		, questionForm = questionBoard.querySelector("form")
		, questionSaveBTN = questionBoard.querySelector(".save-question")
		, answerType = questionBoard.querySelector(".answer-type")
		, answerList = questionBoard.querySelector(".answer-list");
		// Set insert url path
		questionForm.setAttribute("action-path", "pertanyaan/insert");
		// Set temporary answer
		answerList.innerHTML = `
			<div class="half-box">
				<span contenteditable='true' name='answers[]' disabled>Tulis jawaban disini....</span>
			</div>
			<div class="half-box">
				<span contenteditable='true' name='answers[]' disabled>Tulis jawaban disini....</span>
			</div>
			<div class="half-box">
				<span contenteditable='true' name='answers[]' disabled>Tulis jawaban disini....</span>
			</div>
			<div class="half-box">
				<span contenteditable='true' name='answers[]' disabled>Tulis jawaban disini....</span>
			</div>
		`;
		// Set temporary question....
		questionBoard.querySelector(".question-name").innerHTML = "Tulis pertanyaan disini";
		questionBoard.querySelector(".answer-type-board").innerHTML = "checklist";
		if(!questionSaveBTN.classList.contains("hidden")) questionSaveBTN.classList.add("hidden");
		// Function for disable question form if question category maybe not wrote
		function isDisableContent(){
			if(this.hasAttribute("disabled")){
				alert("Anda harus menulis kategori pertanyaan terlebih dahulu");
				this.blur();
			}
		}
		// Is content disabled ?
		questionBoard.querySelector(".question-name").setAttribute("disabled", "");
		questionBoard.querySelector(".answer-type-board").setAttribute("disabled", "");
		questionBoard.querySelector(".question-name").addEventListener("focus", isDisableContent);
		questionBoard.querySelector(".answer-type-board").addEventListener("focus", disableContent);
		answerList.querySelectorAll("[name='answers[]']").forEach(function(answer){
			answer.addEventListener("focus", disableContent);
		});
		// When user click insert answer button
		questionBoard.querySelector("[button-control='create-new-answer']").onclick = function(event){
			questionForm.innerHTML += `<input type="hidden" name="id-kategori-pertanyaan" value="${currentId}">`;
			event.preventDefault();
			insertAnswer(questionForm, quest.nama_tipe_jawaban);
		}
		questionBoard.querySelector("[button-control='remove-question']").onclick = function(event){
			event.preventDefault();
			removeQuestionPanel(questionBoard);
		}
		listQuestion.appendChild(questionBoard);
		interaction.injectParticularEditor(questionCategory, questionCategoryForm, server.viewURL(), function(res){
			// Enable question, tipe answer, & answers
			questionBoard.querySelector(".question-name").removeAttribute("disabled");
			questionBoard.querySelector(".answer-type-board").removeAttribute("disabled");
			answerList.querySelectorAll("[name='answers[]']").forEach(function(answer){
				answer.addEventListener("focus", disableContent);
			});
			questionCategoryForm.setAttribute("action-path", "kategori-pertanyaan/update");
			var currentId = res.data.result.max_id;
			questionCategoryForm.innerHTML += `<input type="hidden" name="id" value="${currentId}">`;
			$http.get();
			interaction.injectParticularEditor(questionCategory, questionCategoryForm, server.viewURL());
		});

		mainContainer.appendChild(mainboard);
		mainboard.scrollIntoView();
	}
}