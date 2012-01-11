# Ext.i18n.Bundle

##v0.3

Ext.i18n.Bundle allows to use properties files (or bundle files) from Java to use them as i18n resources with Sencha Touch.

### Example

	Ext.application({
		name: 'AppTest',
		launch: function(){
			//1
			bundle = Ext.create('Ext.i18n.Bundle',{
				bundle: 'Application',
				lang: 'es-ES',
				path: 'resources',
				noCache: false 
			});
			//2
			bundle.onReady(function(){
				Ext.create('Ext.Panel',{
					fullscreen: true,
					html: bundle.getMsg('panel.html') //3
				});
			});
		}
	});
	
Using Ext.i18n.Bundle is very simple. You just need to create your bundle instance (1). In this case we want to retrieve a bundle file called Application for Spanish language - es-ES - located at resources path. This will load a file called Application_es-ES.properties:

GET http://yourdomain/resources/Application_es-ES.properties

In case this file doesn't exist, then the bundle will try at:

GET http://yourdomain/resources/Application.properties

for the default bundle file.

You need to call your code once your bundle file is loaded, so you need to place your code inside onReady method (2). Finally, to access a bundle key, use getMsg method passing the key as argument. That function will retrieve the content for the given key or a String with key name followed by .undefined so you can track what is not actually defined in your bundle file.

##Release Notes

###v0.3
* Sencha Touch 2 PR3 comaptible code.
* Removed config method. All the requests are made using GET method.
* Solved issue with extra arguments passed to URL. Now you have no limits, start nor group extra parameters in URL.

###Known issues
* PhoneGap is using XHR thru file:// protocol then AjaxProxy doesn't retrieve data. Note: This was solved in previous version for Sencha Touch 1 overriding AjaxProxy createRequestCallback method (v0.2.2) see js/AjaxLocalProxy.js
	