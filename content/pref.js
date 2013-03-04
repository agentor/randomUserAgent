/*******************************
* pref.js
* @version 0.1.3 [2009-05-27]
* @license GPL 3 (http://www.gnu.org/licenses/gpl.html)
* @author Heiko Schapitz <heiko.schapitz@googlemail.com>
* 
* This program is free software; you can redistribute and/or modify it      
* under the terms of the GNU General Public License (see http://www.gnu.org/licenses/gpl-3.0.txt)
********************************/
var randomUserAgentPreference = 
{
	setWithPrefix: function(prefix,key,value,type)
	{
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		if(type == "bool")
			pref.setBoolPref(prefix+key,value);
		else if(type == "string")
			pref.setCharPref(prefix+key,value);
		else if(type == "integer")
			pref.setIntPref(prefix+key,value);
		else
			return false;
	},

	set: function(key,value,type)
	{
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		var prefix = "randomuseragent.";
		if(type == "bool")
			pref.setBoolPref(prefix+key,value);
		else if(type == "string")
			pref.setCharPref(prefix+key,value);
		else if(type == "integer")
			pref.setIntPref(prefix+key,value);
		else
			return false;
			
		return true;
	},
	getWithPrefix: function(prefix,key,type){
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		if(type == "bool") {
			return pref.getBoolPref(prefix+key)
		} else if(type == "string") {
			return pref.getCharPref(prefix+key);
		} else if(type == "integer") {
			return pref.getIntPref(prefix+key);
		}
	},
	get: function(key,type) {
		
		var prefix = "randomuseragent.";
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		if(pref.prefHasUserValue(prefix+key)) {
			if(type == "bool") {
				return pref.getBoolPref(prefix+key)
			} else if(type == "string") {
				return pref.getCharPref(prefix+key);
			} else if(type == "integer") {
				return pref.getIntPref(prefix+key);
			}
		} else {
			return false;
		}
	},
	
	clearWithPrefix: function(prefix,key) {
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		if(pref.prefHasUserValue(prefix+key)) {
			pref.clearUserPref(prefix+key);
		}
	},
	
	clear: function(key) {
		var prefix = "randomuseragent.";
		var pref = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		if(pref.prefHasUserValue(prefix+key)) {
			pref.clearUserPref(prefix+key);
		}
	}
}