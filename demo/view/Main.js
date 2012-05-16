Ext.define('AppTest.view.Main', {
	extend: 'Ext.TabPanel',
	xtype: 'mainview',
	alias: 'widget.mainview',
	
	requires:[
		'AppTest.view.Settings',
		'Ext.i18n.Bundle'
	],
		
	config: {
		fullscreen: true,
	    tabBarPosition: 'bottom',
	
		items:[{
			title: Ext.i18n.Bundle.message('home.icon.title'),
			iconCls: 'home',
			items: [{
				xtype: 'toolbar',
				docked: 'top',
				title: Ext.i18n.Bundle.message('home.title')
			},{
				html: Ext.i18n.Bundle.message('home.html', {username: 'User'})
			}]
		},{
			xtype: 'settings',
			title: Ext.i18n.Bundle.message('settings.icon.title'),
			iconCls: 'settings',
		}] 
	}
	
});

