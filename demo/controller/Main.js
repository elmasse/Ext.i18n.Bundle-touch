Ext.define('AppTest.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs:{
	      	englishButton: 'button[action=to-english]',
	   		spanishButton: 'button[action=to-spanish]',
			mainView: 'mainview'
		}
	}
});