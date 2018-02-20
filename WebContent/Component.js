sap.ui.define([
	"sap/ui/core/UIComponent"
	
], function(UIComponent){
	return UIComponent.extend("itpcl.mm.approvepo.Component",{
		metadata:{
			"routing" :{
				"config" :{
					"routerClass" : "sap.m.routing.Router",
					"viewType"    : "XML",
					"viewPath"    : "itpcl.mm.approvepo.views",
					"controlId"	  : "myApp"
				},
				"routes" : [{
					"pattern" : "", 
					"name"   : "headerDetails",
					"target"  : ["masterTarget"]
					
				},
				
				{
					"pattern" : "", 
					"name"   : "zeroView",
					"target"  : ["zeroTarget"]
				},
				{
					"pattern" : "items/{surya}", 
					"name"   : "itemDetails",
					"target"  : ["itemTarget"]
				}
				
				],
				"targets" : {
					
					"masterTarget" : {
						"viewName" : "headerDetails",
						"viewId"   : "idMaster",
						"controlAggregation" :"masterPages"
						
					},
					"zeroTarget" : {
						"viewName" : "zeroView",
						"viewId"   : "idInitial",
						"controlAggregation" :"detailPages"
						
					},
					"itemTarget" : {
						"viewName" : "itemDetails",
						"viewId"   : "idItems",
						"controlAggregation" :"detailPages"
						
					}
				},
				
			}
		},
		init:function(){
			sap.ui.core.UIComponent.prototype.init.apply(this);
			var oRouter = this.getRouter();
			oRouter.initialize();
			var sServiceUrlPo = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZPO_FINAL_SRV";
			var user = "sapdev";
			var pass = "admin@123";

			var oModelPo = new sap.ui.model.odata.ODataModel(
					sServiceUrlPo,true, user,pass);
			var oJsonModel = new sap.ui.model.json.JSONModel(
					oModelPo);
			oModelPo
					.read(
							"/PurchaseOrderHeaderCollection?$expand=PurchaseOrderItem",
							null,
							null,
							true,
							function(oData,
									response) {
								oJsonModel
										.setData(oData);
							});
	console.log(oJsonModel);
			this.setModel(oJsonModel,"header");
		
			var user = "sapdev";
			var pass = "admin@123";
			var sServiceUrlItems = "proxy/http/122.165.148.177:8000/sap/opu/odata/sap/ZPO_FINAL_SRV";
			var oModelItems = new sap.ui.model.odata.ODataModel(sServiceUrlItems,true, user,pass);
			var oJsonModelItems = new sap.ui.model.json.JSONModel(oModelItems);
			oModelItems.read("/PurchaseOrderHeaderCollection('4500018256')?$expand=PurchaseOrderItem",null,null,true,function(oData,response) {
				oJsonModelItems.setData(oData);
			});
			console.log(oJsonModelItems);
			this.setModel(oJsonModelItems,"items");
			
			
			
			
		},
		createContent:function(){
			var page1 = sap.ui.view({id:"idHeaderDetails1", viewName:"itpcl.mm.approvepo.views.App", type:sap.ui.core.mvc.ViewType.XML});
//			var page1 = sap.ui.view({id:"idHeaderDetails1", viewName:"itpcl.mm.approvepo.views.headerDetails", type:sap.ui.core.mvc.ViewType.XML});
//			var page2 = sap.ui.view({id:"idItemDetails1", viewName:"itpcl.mm.approvepo.views.itemDetails", type:sap.ui.core.mvc.ViewType.XML});
//			var page3 = sap.ui.view({id:"idZero",viewName:"itpcl.mm.approvepo.views.zeroView",type:sap.ui.core.mvc.ViewType.XML});		
//					var app = new sap.m.SplitApp("idApp",{
//						initialMasterPage:"idHeaderDetails1",
//						initialDetailPage:"idZero",
//						masterPages : [page1],
//						detailPages:[page3,page2]
//					});
//					
  return page1;
		},
		
		destroy: function(){}
	})
	
})