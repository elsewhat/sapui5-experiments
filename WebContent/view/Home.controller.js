
sap.ui.controller("view.Home", {

	onInit : function() {
	},
	
	doNavApproveWorkItems : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		var data;
		bus.publish("nav", "to", { 
			id : "TimeWritingMaster"
		});
		/*
		if(!jQuery.device.isphon && sap.ui.getCore().byId("LrDetail")) {
			data = sap.ui.getCore().byId("LrDetail").getBindingContext("lr");
			bus.publish("nav", "to", { 
				id : "LrDetail",
				data: data
			});
		}
		*/
	},
	
	doNavPerformTimeWriting : function(evt) {
		var bus = sap.ui.getCore().getEventBus();
		var data;
		bus.publish("nav", "to", { 
			id : "TimeWritingMaster"
		});
		/*
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "SplitAppPo"
		});
		*/
	}
});