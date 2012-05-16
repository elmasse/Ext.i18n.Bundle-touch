Ext.application({
	name: 'AppTest',
	appFolder: 'demo',

	requires: ['Ext.i18n.Bundle'],

	views: ['Main'],
	controllers:['Main', 'Settings'],
  
  	launch: function() {

  		Ext.i18n.Bundle.configure({
			bundle: 'Application',
			language: 'en-US',
			path: 'resources',
			noCache: false
  		});

        Ext.Viewport.add({
            xclass: 'AppTest.view.Main'
        });
    }

});	