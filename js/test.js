/*
 * This is a test file for Bundle.js
 *
 * @author: elmasse(c) Maximiliano Fierro 2011
 *
 */

Ext.regApplication({
    name: 'BundleTest',
    launch: function() {
		var lang;
		var params = Ext.urlDecode(window.location.search.substring(1));
		if(params.lang)
			lang = params.lang;
	
		bundle = new Ext.i18n.Bundle({bundle:'Application', path:'resources', lang: lang});
		bundle.onReady(function(){

			var toolbar = new Ext.Toolbar({
				title: bundle.getMsg('panel.title'),
				dock: 'top',
				items: [{
					text: Ext.util.Format.format(bundle.getMsg('back.button'), 'Formated'),
					ui: 'back'
				},{
					text: 'Home'
				}]
			});

			var viewport = new Ext.Panel({
			    fullscreen: true,
			    layout: 'card',
			    dockedItems: [toolbar],
			    html: bundle.getMsg('panel.html')
			});	
	
		}); //bundle.onReady
	}
});