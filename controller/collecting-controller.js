app.controller("collectingController", collectingControllerInit);
// Function collectingControllerInit, handle all interaction in the page of collecting data
function collectingControllerInit(server, servant, interaction, collectingServant) {
	var questionTypeAPI = `${server.viewURL()}/kategori-pertanyaan/view`;
	// Get all type question from server
	$http.get(questionTypeAPI)
	.error(server.handleError("Collection data - Question category"))
	.success(function(data){
		data.forEach(function(content, index){
			var form = document.querySelector(".form-card")
			, mainboard = form.parentElement; 
			if(index > 0) {
				form = form.cloneNode(true);
			}
			document.querySelector(".question-type-board").innerText = content.nama_tipe_pertanyaan;
			
			var questionAPI = `${server.viewURL()}/pertanyaan/view/${content.id}/`;
			console.log(questionAPI);
			$http.get(questionAPI)
			.error(server.handleError("Collecting data - Question category"))
			.success(function(questions){
				for(x in questions) {
					var question = questions[x]
					, questionRow = document.querySelector("newquestionrow div").cloneNode(true)
					, questionExplanation  = questionRow.querySelector(".question-explanation")
					, questionInput = questionRow.querySelector(".question-input");
					// Display explanation of question
					questionExplanation.innerText = question.nama_pertanyaan;
					switch(question.nama_tipe_jawaban) {
						case "isian" :
							questionInput.innerHTML = `
								<input type='text' class='container'>
							`;
						break;

						case "checklist" :
						case "pilihan-ganda" :
							var getAnswerAPI = `${server.viewURL()}/jawaban/view/${question.id}`;
							$http.get(getAnswerAPI).error(server.handleError("Get answer"))
							.success(function(answers){
								for(i in answers){
									var answer = answers[i];
									if(question.nama_tipe_jawaban == "checklist"){
										questionInput.innerHTML = `
											<input type='checkbox' name='choices' value='${answer.nama_jawaban}'>
										`;
									}
									else if(question.nama_tipe_jawaban == "pilihan-ganda"){
										questionInput.innerHTML = `
											<input type='radio' name='choices' value='${answer.nama_jawaban}'>
										`;
									}
									questionInput.innerHTML += `<span class='mg-left-2'>${answer.nama_jawaban}</span>`;
								}
							});
						break;
					}
				}

			});
		});
		collectingServant.init();
	});
}