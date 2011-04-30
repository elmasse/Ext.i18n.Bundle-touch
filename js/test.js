/*
 * This is a test file for Bundle.js
 *
 * @author: elmasse(c) Maximiliano Fierro 2008
 *
 */



Ext.onReady(function(){
	var lang;
	var params = Ext.urlDecode(window.location.search.substring(1));
	if(params.lang)
		lang = params.lang;
		
	var bundle = new Ext.i18n.Bundle({bundle:'Application', path:'resources', lang: lang});
	bundle.onReady(function(){
	
		var toolbar = new Ext.Toolbar({
		title: bundle.getMsg('panel.title'),
		dock: 'top',
		items: [{
			text: String.format(bundle.getMsg('back.button'), 'Formated'),
			ui: 'back'
		},{xtype: 'spacer'},{
			text: 'Home'
		}]
	});

	var viewport = new Ext.Panel({
	    fullscreen: true,
	    animation: 'slide',
	   // scroll: 'vertical',
	    layout:{type: 'card'},
	    dockedItems: [toolbar],
	    html: bundle.getMsg('panel.html')
	});	
		
	}); //bundle.onReady
});