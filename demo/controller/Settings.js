Ext.define('AppTest.controller.Settings', {
	extend: 'Ext.app.Controller',
	
	views: ['Settings'],
	
	init: function(){
		this.control({
			'formpanel radiofield':{
				check: this.onLanguageChange
			}
		});
	},
	
	onLanguageChange: function(field, evt, opts){
		var value = field._value, //field.getValue() returns true????
			current = bundle.getLanguage();

		if(current !== value)
		 	bundle.setLanguage(value);
	}
});