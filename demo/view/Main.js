Ext.define('AppTest.view.Main', {
	extend: 'Ext.TabPanel',
	
	requires:['AppTest.view.Settings'],
		
	config: {
		fullscreen: true,
		fullscreen: true,
	    tabBarPosition: 'bottom',
	
		items:[{
			title: bundle.message('home.icon.title'),
			iconCls: 'home',
			html: bundle.message('home.html', {username: 'User'})
		},{
			xtype: 'settings',
			title: bundle.message('settings.icon.title'),
			iconCls: 'settings',
		}] 
	}
	
});

