Ext.define('AppTest.controller.Settings', {
	extend: 'Ext.app.Controller',

	requires: ['Ext.i18n.Bundle'],

	config:{
		control:{
			'settings radiofield':{
				'check': 'onLanguageChange'
			}
		}
	},
	
	onLanguageChange: function(field, evt, opts){
		var value = field.getSubmitValue(),
			current = Ext.i18n.Bundle.getLanguage();
		
		if(current !== value)
		 	Ext.i18n.Bundle.setLanguage(value);
	}
});