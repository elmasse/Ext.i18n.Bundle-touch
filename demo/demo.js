Ext.require('Ext.i18n.Bundle', function(){
	//create global bundle in here
	Ext.i18n.appBundle = Ext.create('Ext.i18n.Bundle',{
		bundle: 'Application',
		lang: 'es-ES',
		path: 'resources',
		noCache: true
	});
});

Ext.application({
	name: 'AppTest',
	launch: function(){
		Ext.i18n.appBundle.onReady(function(){
			Ext.create('Ext.Panel',{
				fullscreen: true,
				html: Ext.i18n.appBundle.getMsg('panel.html')
			});
		});
	}
});	