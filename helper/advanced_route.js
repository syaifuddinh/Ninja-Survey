app.service("advanced_route", ["servant", loadAdvancedRoute]);
// Load advanced route
function loadAdvancedRoute(servant){
	this.go =  function(handle, obj){
		servant.toggleLoader();
		switch(handle){
			case "form" :
				var formLead = obj.getAttribute("form-id");
				if(formLead && formLead === "invoice"){
					location.href = "index.html#forminvoice/move";
					return "FORM INVOICE";
				}
				else if(formLead && formLead === "ticketing"){
					location.href = "index.html#formticketing/move";	
					return "FORM TICKETING";
				}
				else if(formLead && formLead === "cashflow"){
					location.href = "index.html#cashflow/move";	
					return "FORM CASHFLOW";
				}
			break;

			case "view" :
				var viewLead = obj.getAttribute("view-id");
				if(viewLead && viewLead === "invoice"){
					location.href = "index.html#viewinvoice";
					return "VIEW INVOICE";
				}
				else if(viewLead && viewLead === "ticketing"){
					location.href = "index.html#viewticketing";	
					return "VIEW TICKETING";
				}
				else if(viewLead && viewLead === "cashflow"){
					location.href = "index.html#viewcashflow";	
					return "VIEW CASHFLOW";
				}
			break;

			case "print":
				var printLead = obj.getAttribute("print-id");
				if(printLead && printLead === "invoice"){
					location.href = "index.html#printinvoice";
					return "PRINT INVOICE";
				}
				else if(printLead && printLead === "ticketing"){
					location.href = "index.html#printticketing";	
					return "PRINT TICKETING";
				}
				else if(printLead && printLead === "cashflow"){
					location.href = "index.html#printcashflow";	
					return "PRINT CASHFLOW";
				}
			break;
			default :
				servant.toggleLoader(false);
		}
	}
}