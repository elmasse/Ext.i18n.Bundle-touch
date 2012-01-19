Ext.define('AppTest.controller.Main', {
	extend: 'Ext.app.Controller',

	views:['Main'],
	
	refs:[{
      	ref: 'englishButton',
      	selector: 'button[action=to-english]'
    },{
      	ref: 'spanishButton',
      	selector: 'button[action=to-spanish]'
	}],
	
	init: function(){
		
		// this.control({
		// 	'button[action=to-spanish]':{
		// 		tap: this.toSpanish
		// 	}
		// },{
		// 	'button[action=to-english]':{
		// 		tap: this.toEnglish
		// 	}
		// });
		
		this.getMainView().create();
	}
});