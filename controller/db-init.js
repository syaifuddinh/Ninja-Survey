window["db-request"] = indexedDB.open("surveyDB", 4);
window.db = null;
// When database not created before
window["db-request"].onupgradeneeded = function(event){
	console.log("Upgrading.....");
	window.db = event.target.result;
	if(!window.db.objectStoreNames.contains("participants")) {
        window.db.createObjectStore("participants", {keyPath : "id"});
    }
    else if(!window.db.objectStoreNames.contains("pending_data")) {
        window.db.createObjectStore("pending_data", {autoIncrement : true});
    }
}
// On success when access surveyDB
window["db-request"].onsuccess = function(event){
	console.log("Success access database");
	window.db = event.target.result;
}
// On error when access surveyD
window["db-request"].onerror = function(even) {
	console.log(event.target.errorMessage);
}