sap.ui.jsview("view.App", {

	getControllerName : function() {
		return "view.App";
	},

	createContent : function(oController) {
		this.setDisplayBlock(true);
		
		// create app control
		this.shell = new sap.m.Shell("Shell", {
			title : "My Inbox",
			showLogout : false,
			homeIcon : {
				'phone' : 'img/home/57_iPhone_Desktop_Launch.png',
				'phone@2' : 'img/home/114_iPhone-Retina_Web_Clip.png',
				'tablet' : 'img/home/72_iPad_Desktop_Launch.png',
				'tablet@2' : 'img/home/144_iPad_Retina_Web_Clip.png',
				'favicon' : 'img/home/favicon.ico',
				'precomposed': false
			}
		});
		this.app = new sap.m.App("App");
		//this.splitAppLr = new sap.m.SplitApp("SplitAppLr");
		
		// add only the home page. all others pages are lazy loaded
		this.app.addPage(sap.ui.htmlview("Home", "view.Home"));
		//this.app.addPage(this.splitAppLr);
		//this.splitAppLr.addMasterPage(sap.ui.htmlview("LrMaster", "view.LrMaster"));
		//this.splitAppLr.addDetailPage(sap.ui.htmlview("LrEmpty", "view.LrEmpty"));
		
		//purchase order app
		//this.splitAppPo = new sap.m.SplitApp("SplitAppPo");
		// add only the home page. all others pages are lazy loaded
		//this.app.addPage(this.splitAppPo);
		//this.splitAppPo.addMasterPage(sap.ui.htmlview("PoMaster", "view.PoMaster"));
		//this.splitAppPo.addDetailPage(sap.ui.htmlview("PoEmpty", "view.PoEmpty"));
		
		this.shell.setApp(this.app);
		
		// done
		return this.shell;
		

	}

});