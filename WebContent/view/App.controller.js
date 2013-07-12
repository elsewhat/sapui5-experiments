jQuery.sap.require("sap.m.InstanceManager");
jQuery.sap.require("jquery.sap.history");

sap.ui.controller("view.App", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
*/
	onInit : function() {
		
		// subscribe to event bus
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navHandler, this);
		//bus.subscribe("nav", "back", this.navHandler, this);
		//bus.subscribe("nav", "virtual", this.navHandler, this);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
*/
//	onExit: function() {
//
//	}
	navHandler: function(channelId, eventId, data) {
		if(eventId === "to"){
			if (!data.id) {
				jQuery.sap.log.error("'nav to' event cannot be processed. data.id must be given");
			}
			this.navTo(data.id, data.data, true);
		}else{
			jQuery.sap.log.error("'nav' event cannot be processed. There's no handler registered for event with id: " + eventId);
		}
	},	
	
	navTo : function(id, data, writeHistory) {
		if(id === undefined){
			// invalid id
			jQuery.sap.log.error("navTo failed due to missing id");
		}else{
			//Closing popovers needs to be done in navTo and navBack
			if(sap.m.InstanceManager.hasOpenPopover()){
				sap.m.InstanceManager.closeAllPopovers();
				jQuery.sap.log.info("navTo - closed popover(s)");
			}
			
			var bUpdateOnly = false;
			
			if(id === this._previousId){
				bUpdateOnly = true;
			}
			this._previousId = id;
			// navigate on app
			this.toView(id, data, bUpdateOnly);

			// log
			jQuery.sap.log.info("navTo - to page: " + id);
		}
	},
	
	/**
	 *  this is the lazy loading of views (based on identical IDs for view and view-instance)
	 */
	toView: function(id, data, updateDataOnly){
		
		// load view on demand
		var appId = "App";
		var app = sap.ui.getCore().byId(appId);
		var master = false;
		var page = app.getPage(id, master);
		
		if (page === null) {
			var type = "HTML";
			var name = "view."+id;
			var page = sap.ui.view({
				id : id,
				viewName : name,
				type : type
			});
			
			app.addPage(page, master);
			jQuery.sap.log.info("app controller > loaded page: " + id);
		}else{
			if(updateDataOnly){
				var oNavInfo = {
						from:null,
						fromId:null,
						to:page,
						toId:page.getId(),
						firstTime:false,
						isTo:false,
						isBack:false,
						isBackToPage:false,
						isBackToTop:false,
						direction:"to"
				};
				
				var oEvent = jQuery.Event("BeforeShow", oNavInfo);
				oEvent.srcControl = page;
				oEvent.data = data;
				oEvent.backData = {};
				page._handleEvent(oEvent);
				
				return;
			}
		}
		
		// navigate in the app control
		var transition = "show";
		app.to(id, transition, data);
	},

});