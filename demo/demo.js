Ext.require('patch.Button'); 

Ext.require('Ext.i18n.Bundle', function(){
	bundle = Ext.create('Ext.i18n.Bundle',{
		bundle: 'Application',
		lang: 'en-US',
		path: 'resources',
		noCache: true
	});

});

Ext.application({
	name: 'AppTest',
	appFolder: 'demo',
	controllers:['Main', 'Settings']

	 
/*
	launch: function(){
		
		bundle = Ext.create('Ext.i18n.Bundle',{
			bundle: 'Application',
			lang: 'es-ES',
			path: 'resources',
			noCache: true
		});
		
		bundle.onReady(function(){
			Ext.create('Ext.Panel',{
				fullscreen: true,
				html: bundle.getMsg('panel.html')
			});
		});
	}
*/
});	