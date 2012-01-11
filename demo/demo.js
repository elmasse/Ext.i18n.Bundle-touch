Ext.application({
	name: 'AppTest',
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
});	