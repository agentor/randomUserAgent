/*******************************
* uninstall.js
* @version 0.1 [2009-06-05]
* @license GPL 3 (http://www.gnu.org/licenses/gpl.html)
* @author Heiko Schapitz <heiko.schapitz@googlemail.com>
* 
* This program is free software; you can redistribute and/or modify it      
* under the terms of the GNU General Public License (see http://www.gnu.org/licenses/gpl-3.0.txt)
********************************/


function randomUserAgent_initializeOverlay() {
	randomUserAgent_UninstallObserver.register();
}

var randomUserAgent_UninstallObserver = {
	_uninstall : false,
	
	observe : function(subject, topic, data) {
		var version = randomUserAgentVersion;
		var addon_id = version.getAddonId();


		if (topic == "em-action-requested") {
    		subject.QueryInterface(Components.interfaces.nsIUpdateItem);

			/** if it matches with my addon id **/
    		if (subject.id == addon_id) {
    			if (data == "item-uninstalled") {
        			this._uninstall = true;
      			} else if (data == "item-cancel-action") {
        			this._uninstall = false;
        			alerT('galse');
      			}
			}
		} else if (topic == "quit-application-granted") {
			if (this._uninstall) {
				this.clearPreferences();
			} else {	
			
			}
    		this.unregister();
		}
	},
	register : function() {
		var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
		observerService.addObserver(this, "em-action-requested", false);
		observerService.addObserver(this, "quit-application-granted", false);
	},
	unregister : function() {
		var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
		observerService.removeObserver(this,"em-action-requested");
		observerService.removeObserver(this,"quit-application-granted");
	},
	
	clearPreferences : function() {
		var i;
		var j;
		var k;
		
		/* uninstall stuff. */
		var pref = randomUserAgentPreference;

		pref.clear('version'); /** The Version **/
		pref.clear('modus') /** The Modus **/
		pref.clear('first_run');
		pref.clearWithPrefix('general.','useragent.override') /** The User Agent **/
		
		/** All Browsers **/
		var count_browser = pref.get('browser.count','integer');

		var count_browser_version = 0;
		for(i=1;i<=count_browser;i++) {
			
			count_browser_version = pref.get('browser.' + i + '.version.count','integer');
			for(j=1;j<=count_browser_version;j++) {
				 pref.clear('browser.' + i + '.version.' + j + '.use');
				 pref.clear('browser.' + i + '.version.' + j + '.gecko');
				 pref.clear('browser.' + i + '.version.' + j + '.no');
				 pref.clear('browser.' + i + '.version.' + j + '.webkit');
			}
			pref.clear('browser.' + i + '.version.count');
			pref.clear('browser.' + i + '.name');
			pref.clear('browser.' + i + '.use');
			pref.clear('browser.' + i + '.user_agent');
			
		}
		pref.clear('browser.count');
		
		/** All Operating Systems **/
		var count_os = pref.get('os.count','integer');
		var count_os_version = 0;

		for(i=1;i<=count_os;i++) {
			count_os_version = pref.get('os.' + i + '.version.count','integer');

			for(j=1;j<=count_os_version;j++) {
				pref.clear('os.' + i + '.version.' + j + '.name');
				pref.clear('os.' + i + '.version.' + j + '.use');
				for(k=1;k<=3;k++) {
					pref.clear('os.' + i + '.version.' + j + '.no.' + k);	
				}
			}
			pref.clear('os.' + i + '.version.count');
			pref.clear('os.' + i + '.name');
			pref.clear('os.' + i + '.use');
		}
		
		pref.clear('os.count');
	}
}
window.addEventListener("load", randomUserAgent_initializeOverlay, false);