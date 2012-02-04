/**
 * @author Maximiliano Fierro
 * @class Ext.i18n.Bundle
 * @extends Ext.data.Store
 *
 * Bundle is used to load .properties bundle files based in language and expose the bundle's keys thru getMsg method.
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
	//@private
	cExp: /\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
	
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
		 * 		xx: Language code (2 characters lowercase) 
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

		me.bundle = config.bundle || me.bundle;
		me.path = config.path || me.path;
			
		url = this.buildURL(language);

		delete config.lang;
		delete config.noCache;
		
		Ext.applyIf(config, {
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
			},
			listeners:{
				'load': this.onBundleLoad,
				scope: this
			}
		});

		me.callParent([config]);
		me.setLanguage(language);
	},
	
	/**
	 * @private
	 */
	guessLanguage: function(){
		return (navigator.language || navigator.browserLanguage
				|| navigator.userLanguage || this.defaultLanguage);
	},
	
	message: function(key, obj){
		var cKey = this.getContentKey(key),
			data = '';
			
		for(var p in obj){
			data+=' data-'+p+'="'+obj[p]+'"';
		}	
			
		return '<span class="bundle '+cKey+'"' + data +'></span>';
	},

	getLanguage: function(){
		return this.language;
	},
		

	setLanguage: function(lang){
		var me = this,
			proxy = this.getProxy();
		
		me.language = lang;
		proxy.on('exception', me.loadParent, me, {single: true});
		proxy.setUrl(me.buildURL(me.language));
		me.load();
	},
	
	/**
	 * @private
	 */
	onBundleLoad: function(store, records, success, op) {
		var me = this,
			str = ' .bundle{height:0 !important; width:0!important;}\n';
		if(success){
			Ext.Array.forEach(records, function(r, i){
				str += me.createContentLine(r);
			});
			me.appendRules(str);
		}
    },

	appendRules: function(str){
		var style = document.createElement('style'),
			sId = 'localized-css',//this.proxy.url,
			head = Ext.getHead(),
			el;
		
		el = Ext.get(sId);
		if(el) el.destroy();
		
		style.setAttribute('id', sId);
		style.innerHTML = str;
		
		head.appendChild(style);
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
	},
	
	createContentLine: function(record){
		var key = record.get('key'),
			value = record.get('value'),
			cKey;
			
		cKey = this.getContentKey(key);
		cValue = this.getContentValue(value);	
		
		return '.' + cKey + ':after { content:' + cValue + ';}\n';
	},
	
	getContentKey: function(k){
		return 'bundle-'+k.replace(/\./g, '-');
	},
	
	getContentValue: function(v){
		var ret;
		function fn(m, n){
			return '\" attr(data-'+n+') \"';	
		}
		ret = v.replace(this.cExp, fn);
		
		//ret = escape(ret).replace(/%/g, '\\0000');
		
		return '\"'+ret+'\"';
	}
	
});