/**
 * @author Maximiliano Fierro
 * @class Ext.i18n.Bundle
 * @extends Ext.data.Store
 *
 * Bundle is used to load .properties bundle files based in language and expose the bundle's keys thru getMsg method.
 <code>
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
            tpl: [
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
 </code>
 */
Ext.define('Ext.i18n.Bundle', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.i18n.reader.Property',
        'Ext.i18n.model.Property'
    ],
    
    //@private
    defaultLanguage: 'en-US',
    //@private
    resourceExt: '.properties',
    
    config:{
        /**
         * @cfg bundle {String} bundle name for properties file. Default to message  
         */
        bundle: 'message',

        /**
         * @cfg path {String} URI to properties files. Default to resources
         */
        path: 'resources'

        /**
         * @cfg lang {String} Language in the form xx-YY where:
         *      xx: Language code (2 characters lowercase) 
         *      YY: Country code (2 characters upercase). 
         * Optional. Default to browser's language. If it cannot be determined default to en-US.
         */
        
        /**
         * @cfg noCache {boolean} whether or not to disable Proxy's cache. Optional. Defaults to true. 
         */
        
    },
    
    
    constructor: function(config){
        config = config || {};

        var me = this,
            language = me.formatLanguageCode(config.lang || me.guessLanguage()),
            noCache = (config.noCache !== false),
            url;

        me.language = language;
        me.bundle = config.bundle || me.bundle;
        me.path = config.path || me.path;
            
        url = this.buildURL(language);

        delete config.lang;
        delete config.noCache;
        
        Ext.applyIf(config, {
            autoLoad: true,
            model: 'Ext.i18n.model.Property',
            proxy:{
                type: 'ajax',
                url: url,
                noCache: noCache,
                reader: {
                    type: 'property'
                },
                //avoid sending limit, start & group params to server
                getParams: Ext.emptyFn
            }
        });

        me.on({
            'load': this.onBundleLoad,
            scope: this
        });

        me.callParent([config]);
        me.getProxy().on('exception', this.loadParent, this, {single: true});
    },
    
    /**
     * @private
     */
    guessLanguage: function(){
        return (navigator.language || navigator.browserLanguage || navigator.userLanguage || this.defaultLanguage);
    },
    
    /**
     * @method: getMsg
     * Returns the content associated with the bundle key or {bundle key}.undefined if it is not specified.
     * @param: key {String} Bundle key.
     * @return: {String} The bundle key content. 
     */
    getMsg: function(key){
        return this.getById(key)? Ext.util.Format.htmlDecode(this.getById(key).get('value')) : key + '.undefined';
    },
    
    /**
     * @method: onReady
     * The fn will be called when the Bundle file is loaded.
     * @param: fn {Function}
     */
    onReady: function(fn){
        this.readyFn = fn;
        this.on('loaded', this.readyFn, this);
    },
    
    /**
     * @private
     */
    onBundleLoad: function(store, record, success, op) {
        if(success){
            this.fireEvent('loaded');
        }
    },

    /**
     * @private
     */
    onProxyLoad: function(op){
        if(op.getRecords()){
            this.callParent(arguments);
        }
    },
    
    /**
     * @private
     */
    buildURL: function(language){
        var url = '';
        if (this.path) url+= this.path + '/';
        url+=this.bundle;
        if (language) url+= '_'+language;
        url+=this.resourceExt;
        return url;
    },
    
    /**
     * @private
     */
    loadParent: function(){
        this.getProxy().setUrl(this.buildURL());
        this.load();
    },
    
    /**
     * @private
     */
    formatLanguageCode: function(lang){
        var langCodes = lang.split('-');
        langCodes[0] = (langCodes[0]) ? langCodes[0].toLowerCase() : '';
        langCodes[1] = (langCodes[1]) ? langCodes[1].toUpperCase() : '';
        return langCodes.join('-');
    }
    
    
    
}, function(){

    //hook into initConfig
    Ext.override(Ext.Base, {

        initConfig: function(){
            var configNameCache = Ext.Class.configNameCache,
                k, config, nameMap;

            this.callParent(arguments);

            config = this.config;

            for(k in config){
                if(config.hasOwnProperty(k) && config[k] && typeof config[k] === 'object' && config[k].type && config[k].type === 'bundle'){
                    nameMap = configNameCache[k];
                    if(this[nameMap.set]){
                        this[nameMap.set].call(this, Ext.i18n.Bundle.instance.getMsg(config[k].key));
                    }
                }
            }
        }
    });

    //initialize bundle before app launch
    Ext.override(Ext.app.Application, {
        onDependenciesLoaded: function() {
            var me = this,
                overridden = this.onDependenciesLoaded.$previous,
                ns;

            if(me.bundle){
                //configure the bundle instance and defer launch until bundle launch
                me.bundle = Ext.create('Ext.i18n.Bundle', Ext.apply({
                    autoLoad: true,
                    listeners: {
                        loaded: function(){
                            overridden.apply(me);
                        }
                    }
                }, me.bundle));

                Ext.i18n.Bundle.instance = me.bundle;

            }else{
                me.callOverridden();
            }
        }
    });
});