/*******************************
* install.js
* @version 0.2 [2010-10-15]
* @license GPL 3 (http://www.gnu.org/licenses/gpl.html)
* @author Heiko Schapitz <heiko.schapitz@googlemail.com>
* 
* This program is free software; you can redistribute and/or modify it      
* under the terms of the GNU General Public License (see http://www.gnu.org/licenses/gpl-3.0.txt)
********************************/

var randomUserAgentInstall = {

	addBrowser: function(name,user_agent) {
		var pref = randomUserAgentPreference;
		var count = pref.get('browser.count','integer');
		count = count + 1;
		
		pref.set('browser.'+count+'.name',name,'string');
		pref.set('browser.'+count+'.user_agent',user_agent,'string');
		pref.set('browser.'+count+'.use',true,'bool');
		pref.set('browser.count',count,'integer');
		pref.set('browser.'+count+'.version.count',0,'integer');
		
		return count;
	},
	
	addBrowserVersion: function(id,key_1,value_1,key_2,value_2,key_3,value_3,key_4,value_4) {
		var pref = randomUserAgentPreference;
		var count = pref.get('browser.'+id+'.version.count','integer');
		count = count + 1;
		if(pref.get('browser.'+id+'.name') != "") {
			if(value_1 != "")
				pref.set('browser.'+id+'.version.'+count+'.'+key_1,value_1,'string');
			if(value_2 != "")
				pref.set('browser.'+id+'.version.'+count+'.'+key_2,value_2,'string');
			if(value_3 != "")
				pref.set('browser.'+id+'.version.'+count+'.'+key_3,value_3,'string');
			if(value_4 != "")
				pref.set('browser.'+id+'.version.'+count+'.'+key_4,value_4,'string');	
				
			pref.set('browser.'+id+'.version.'+count+'.use',true,'bool');	
			pref.set('browser.'+id+'.version.count',count,'integer');
		}
	},
	
	addOperatingSystem: function(name) {
		var pref = randomUserAgentPreference;
		var count = pref.get('os.count','integer');
		count = count + 1;
		
		pref.set('os.'+count+'.name',name,'string');
		pref.set('os.'+count+'.use',true,'bool');
		pref.set('os.count',count,'integer');
		pref.set('os.'+count+'.version.count',0,'integer');
		return count;
	},
	
	addOperatingSystemVersion: function(id,name,browser_1,no_1,browser_2,no_2,browser_3,no_3) {
		var pref = randomUserAgentPreference;
		var count = pref.get('os.'+id+'.version.count','integer');
		count = count + 1;
		if(pref.get('os.'+id+'.name') != "") {
			pref.set('os.'+id+'.version.'+count+'.name',name,'string');
			if(no_1 != "")
				pref.set('os.'+id+'.version.'+count+'.no.'+browser_1,no_1,'string');
			if(no_2 != "")
				pref.set('os.'+id+'.version.'+count+'.no.'+browser_2,no_2,'string');
			if(no_3 != "")
				pref.set('os.'+id+'.version.'+count+'.no.'+browser_3,no_3,'string');
				
			pref.set('os.'+id+'.version.'+count+'.use',true,'bool');
			pref.set('os.'+id+'.version.count',count,'integer');
		}
	},
	
	reset: function() {
		var pref = randomUserAgentPreference;
		pref.set('browser.count',0,'integer');
		pref.set('os.count',0,'integer');
		
	},
	
	
	start: function() {
		var pref = randomUserAgentPreference;
		var v = randomUserAgentVersion;
		if(!pref.get('version','string') || pref.get('version','string') != v.get())
		{
			this.reset();
			
			/** Browser **/
			/** Firefox **/
			var firefox = this.addBrowser('Firefox','Mozilla/5.0 ({os}) Gecko/{gecko} {os2} Firefox/{no}');
			
			/** Version 2 **/
			this.addBrowserVersion(firefox,'no','2.0.0.18','gecko','20081029','','','','');
			this.addBrowserVersion(firefox,'no','2.0.0.20','gecko','20081217','','','','');
			
			/** Version 3 **/
			this.addBrowserVersion(firefox,'no','3.0.0','gecko','2008102920','','','','');
			this.addBrowserVersion(firefox,'no','3.0.1','gecko','2008102920','','','','');
			this.addBrowserVersion(firefox,'no','3.0.2','gecko','2008102920','','','','');
			this.addBrowserVersion(firefox,'no','3.0.3','gecko','2008092417','','','','');
			this.addBrowserVersion(firefox,'no','3.0.4','gecko','2008102920','','','','');
			this.addBrowserVersion(firefox,'no','3.0.5','gecko','2008120122','','','','');
			this.addBrowserVersion(firefox,'no','3.0.7','gecko','2009030814','','','','');
			this.addBrowserVersion(firefox,'no','3.0.8','gecko','2009032609','','','','');
			this.addBrowserVersion(firefox,'no','3.0.9','gecko','2009040821','','','','');
			this.addBrowserVersion(firefox,'no','3.0.10','gecko','2009042315','','','','');
			
			/** Version 4 **/
			this.addBrowserVersion(firefox,'no','4.0','gecko','20100101','','','','');
			
			/** Safari **/
			var safari = this.addBrowser('Safari','Mozilla/5.0 ({os}) AppleWebKit/{webkit} (KHTML, like Gecko) Version/{no} Safari/{webkit}');
			this.addBrowserVersion(safari,'no','3.2.1','webkit','525.27.1','','','','');
			
			/** Chrome **/
			var chrome = this.addBrowser('Chrome','Mozilla/5.0 ({os}) AppleWebKit/{webkit} (KHTML, like Gecko) Chrome/{no} Safari/{webkit}');
			this.addBrowserVersion(chrome,'no','0.2.149.27','webkit','525.13','','','','');
			this.addBrowserVersion(chrome,'no','0.4.154.29','webkit','525.19','','','','');
			
			/** Operating Systems **/
			/** Windows **/
			var windows = this.addOperatingSystem('Windows');
			this.addOperatingSystemVersion(windows,'XP',firefox,'Windows; U; Windows NT 5.1; {lang}; rv:1.8.1.12',safari,'Windows; U; Windows NT 5.1; {lang}',chrome,'Windows; U; Windows NT 5.1; {lang}');
			this.addOperatingSystemVersion(windows,'Vista',firefox,'Windows; U; Windows NT 6.0; {lang}; rv:1.8.1.12',safari,'Windows; U; Windows NT 6.0; {lang}',chrome,'Windows; U; Windows NT 6.0; {lang}');
			this.addOperatingSystemVersion(windows,'7',firefox,'Windows; U; Windows NT 6.1; {lang}; rv:2.0b6',safari,'Windows; U; Windows NT 6.1; {lang}',chrome,'Windows; U; Windows NT 6.1; {lang}');
			
			/** Mac OS X **/
			var mac = this.addOperatingSystem('Mac OS X');
			this.addOperatingSystemVersion(mac,'10.5',firefox,'Macintosh; U; Intel Mac OS X 10.5; {lang}; rv:1.9.0.4',safari,'Macintosh; U; Intel Mac OS X 10_5; {lang}','','');
			this.addOperatingSystemVersion(mac,'10.4',firefox,'Macintosh; U; PPC Mac OS X 10.4; {lang}; rv:1.9.0.4',safari,'Macintosh; U; PPC Mac OS X 10_5; {lang}','','');
			
			/** Ubuntu Linux **/
			var ubuntu = this.addOperatingSystem('Ubuntu');
			this.addOperatingSystemVersion(ubuntu,'8.04',firefox,'X11; U; Linux i686; {lang}; rv:1.9.0.3','','','','');
			pref.set('modus','random','string');
			pref.set('version',v.get(),'string');
						
			var rua = randomuseragent;
			rua.getUserAgent();
		}
	}
}