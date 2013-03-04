/*******************************
* overlay.js
* @version 0.2.3 [2009-05-02]
* @license GPL 3 (http://www.gnu.org/licenses/gpl.html)
* @author Heiko Schapitz <heiko.schapitz@googlemail.com>
* 
* This program is free software; you can redistribute and/or modify it      
* under the terms of the GNU General Public License (see http://www.gnu.org/licenses/gpl-3.0.txt)
********************************/
var randomuseragent =
{
	onLoad: function()
	{
		this.install();
    	this.getUserAgent();
	},

	randomize: function(range)
	{
		return Math.ceil(Math.random() * 1000) % range + 1;
	},
	
	count: function(type,param)
	{
		var count;
		var pref = randomUserAgentPreference;
		if(type == "browser")
		{
			count = pref.get('browser.count','integer'); 
		}
		else if(type == "browser_version")
		{
			if(param)
				count = pref.get('browser.'+param+'.version.count','integer');
		}
		else if(type == "os")
		{
			count = pref.get('os.count','integer');
		}
		else if(type == "os_version")
		{
			if(param) 
				count = pref.get('os.'+param+'.version.count','integer');
		}
		else
		{
			count = 0;
		}
		return count;
	},
	
	install: function()
	{
		var installation = randomUserAgentInstall;
		var pref = randomUserAgentPreference;
		if(!pref.get('version','string')){
			installation.start();
		}else{
			var v = randomUserAgentVersion;
			if(pref.get('version','string') != v.get()){
				installation.start();
			}
		}
		this.show();
	},
	
	show: function() {
	    var status = document.getElementById('randomuseragent_info');
    	status.label = navigator.userAgent;
	},
	
	checkMode: function() {
		var pref = randomUserAgentPreference;
		var mode = pref.get('modus','string');
		if(mode == "random") {
			
		} else if(mode == "amok") {
			this.getUserAgent();
		}
	},
	
  	getUserAgent: function() {
  		var pref = randomUserAgentPreference;
  	  	
  	  	var modus = pref.get('modus','string');
  	  	if(modus == "lock") {
  	  		return;
  	  	} 
  	  	
		var browser;
		do {
    		browser = this.randomize(this.count('browser'));
    	} while(pref.get('browser.'+browser+'.use','bool') == false);
    	
    	var browser_version;
    	do {
    		browser_version = this.randomize(this.count('browser_version',browser));
    	} while(pref.get('browser.'+browser+'.version.'+browser_version+'.use','bool') == false);
    	
    	var use_os = false;
    	var os;
    	do{
	    	do {
	    		os = this.randomize(this.count('os'));
	    	} while(pref.get('os.'+os+'.use','bool') == false);
	
			var os_version;
			var i=0;
			do {
				os_version = this.randomize(this.count('os_version',os));;
				i=i+1;
				if(i>3)
					exit;
			} while( (pref.get('os.'+os+'.version.'+os_version+'.use','bool') == false) && (pref.get('os.'+os+'.version.'+os_version+'.no.'+browser,'string') == "") );
			if(pref.get('os.'+os+'.version.'+os_version+'.no.'+browser,'string') != "")
				use_os = true;
    	}while(use_os == false);

		var ua;
		ua = pref.get('browser.'+browser+'.user_agent','string');
		ua = ua.replace(/{no}/,pref.get('browser.'+browser+'.version.'+browser_version+'.no','string'));

		var browser_name = pref.get('browser.'+browser+'.name','string');
    	if (browser_name == 'Firefox'){
			ua = ua.replace(/{gecko}/,pref.get('browser.'+browser+'.version.'+browser_version+'.gecko','string'));
    	}else if(browser_name == 'Internet Explorer'){
    		ua = ua.replace(/{compatible}/,pref.get('browser.'+browser+'.version.'+browser_version+'.compatible','string'));
    	}else if(browser_name == 'Safari' || browser_name == "Chrome"){
    		ua = ua.replace(/{webkit}/,pref.get('browser.'+browser+'.version.'+browser_version+'.webkit','string'));
    		ua = ua.replace(/{webkit}/,pref.get('browser.'+browser+'.version.'+browser_version+'.webkit','string'));
    	}
 
		ua = ua.replace(/{os}/,pref.get('os.'+os+'.version.'+os_version+'.no.'+browser,'string'));
		
		var os2;
		var os_name = pref.get('os.'+os+'.name','string');
		if(os_name == 'Ubuntu'){
			os2 = os_name+'/'+pref.get('os.'+os+'.version.'+os_version+'.name','string');
		}else{
			os2 = "";
		}
		ua = ua.replace(/{os2}/,os2);
		var apref1 = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var apref = apref1.QueryInterface(Components.interfaces.nsIPrefBranch2);
        var aid = 'general.useragent.locale';
        var lang = apref.getCharPref(aid);
        if (lang.indexOf('chrome://') != -1) {
            var abundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService).createBundle(lang);
            lang = abundle.GetStringFromName(aid);
        }
		if(lang == "")
			lang = 'en-US';
		ua = ua.replace(/{lang}/,lang);
        pref.setWithPrefix('general.','useragent.override', ua ,'string');
		
		this.show();
     },
};
window.addEventListener("load", function(e) { randomuseragent.onLoad(); }, false);