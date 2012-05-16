Ext.define('AppTest.view.Settings',{
	extend: 'Ext.form.Panel',
	xtype : 'settings',
	
    requires: ['Ext.i18n.Bundle'],

	config:{
		items:[{
			xtype: 'toolbar',
			docked: 'top',
			title: Ext.i18n.Bundle.message('settings.title'),
			items:[{
				text: Ext.i18n.Bundle.message('settings.button.text')
			}]
		},{
			xtype:'fieldset',
			title: Ext.i18n.Bundle.message('settings.language.title'),
			items:[{
                 xtype: 'radiofield',
                 name: 'language',
                 label: Ext.i18n.Bundle.message('settings.language.options.english'),
                 value : 'en-US'
             },{
                 xtype: 'radiofield',
                 name: 'language',
                 label: Ext.i18n.Bundle.message('settings.language.options.spanish'),
                 value: 'es-ES'
             }]		
		}]
	},

    initialize: function(){
        var me = this;
        me.on({
            'painted': 'onPainted',
            scope: me
        })
        me.callParent(arguments);
    },

    onPainted: function(cmp, opts){
        var currentLang = Ext.i18n.Bundle.getLanguage(),
            radio = cmp.down('radiofield[originalState='+currentLang+']');
        if(radio){
            radio.setChecked(true);
        }

    }
});