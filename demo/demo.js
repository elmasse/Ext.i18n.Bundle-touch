Ext.application({
    name: 'AppTest',

    requires: ['Ext.i18n.Bundle'],

    bundle: {
        bundle: 'Application',
        lang: 'es-ES',
        path: 'resources',
        noCache: true
    },

    launch: function(){
        Ext.create('Ext.Panel',{
            fullscreen: true,
            items: [
                {
                    xtype: 'titlebar',
                    docked: 'top',
                    title: {type: 'bundle', key: 'panel.title'}
                }
            ],
            tpl: [ //4
                'Hello {name}! <br>',
                '{[this.getMsgFromResources()]}',
                {
                    getMsgFromResources: function(){
                        return AppTest.app.bundle.getMsg('panel.html');
                    }
                }
            ],
            data: {name: 'Joe'}
        });
    }
});