Ext.define('AppTest.controller.Main', {
	extend: 'Ext.app.Controller',

	views:['Main'],


	config: {
		refs:[{
	      	ref: 'englishButton',
	      	selector: 'button[action=to-english]'
	    },{
	      	ref: 'spanishButton',
	      	selector: 'button[action=to-spanish]'
		}],
		
	},
	
	init: function(){
		this.getMainView().create();
	}
});