// Manage all database operation
app.service("DBCommand", [DBCommandInit]);
function DBCommandInit(){
	this.insert = function(table, value){
		value.id = 1;
		console.log(table);
		console.log(value);
		var transaction = window.db.transaction([table], "readwrite").objectStore(table);
		return transaction.add(value);
	};

	this.update = function(id, table, value){

	}

	this.view = function(table, id){
		var transaction = window.db.transaction([table]).objectStore(table);
		console.log(window.db);
		console.log(transaction);
		console.log(transaction.get(id));
		return transaction.get(id);
	};
}