sap.ui.controller("itpcl.mm.approvepo.controllers.headerDetails", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf poapproval.headerDetails
*/
	onInit: function() {
		//hello world
		this.Router = sap.ui.core.UIComponent.getRouterFor(this);
	},

	hitSearch : function(oEvent){
		var aFilters = [];
		var sQuery = oEvent.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("PONumber", sap.ui.model.FilterOperator.Contains, sQuery);
			aFilters.push(filter);
					}
		var list = this.getView().byId("idList");
		var binding = list.getBinding("items");
		binding.filter(aFilters, "Application");
		/*var searchField = oEvent.getParameter("query");
		var oList = this.getView().byId("idList");
		var oFilter = new sap.ui.model.Filter("PONumber",sap.ui.model.FilterOperator.Contains,searchField);
		var aFilter = [oFilter];
		oList.getBinding("items").filter(aFilter);*/
	},
	itemPress: function(oEvent){
		
		var path = oEvent.getParameter("listItem").getBindingContextPath();
		var po = oEvent.getParameter("listItem").getProperty("title");
		console.log(po);
		/*var extra = "/PurchaseOrderItem/results/";
		var path = path + extra;*/
		/*var extra = path.getProperty("POItem");
		console.log(extra);*/
		var oApp = sap.ui.getCore().byId("idApp");
		/*var oView2 = sap.ui.getCore().byId("idItemDetails1");
		oView2.bindElement(path);*/
		//this.getView().getModel()
		

		var oPo = new sap.ui.model.json.JSONModel();
		oPo.setData({
			po : po
		});

		sap.ui.getCore().setModel(oPo,"po");
//		debugger		
//		var oItems = sap.ui.getCore().byId("po");
//		oItems.bindElement(path);

		this.Router.navTo("itemDetails",{
			surya : po
		});	
	},
/* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf poapproval.headerDetails
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf poapproval.headerDetails
*/
	onAfterRendering: function() {
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf poapproval.headerDetails
*/
//	onExit: function() {
//
//	}

});