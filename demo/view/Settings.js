Ext.define('AppTest.view.Settings',{
	extend: 'Ext.form.Panel',
	xtype : 'settings',
	
	config:{
		items:[{
			xtype: 'toolbar',
			docked: 'top',
			title: bundle.message('settings.title')
		},{
			xtype:'fieldset',
			title: bundle.message('settings.language.title'),
			items:[{
                 xtype: 'radiofield',
                 name: 'language',
                 label: bundle.message('settings.language.options.english'),
                 value : 'en-US',
				 checked: bundle.getLanguage() === 'en-US'
             },{
                 xtype: 'radiofield',
                 name: 'language',
                 label: bundle.message('settings.language.options.spanish'),
                 value: 'es-ES',
				 checked: bundle.getLanguage() === 'es-ES'

             }]		
		}]
	}
});