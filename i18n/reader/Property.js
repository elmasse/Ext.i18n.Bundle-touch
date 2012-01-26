Ext.define('Ext.i18n.reader.Property', {
    extend: 'Ext.data.reader.Reader',
    alias : 'reader.property',
	
	constructor: function(config){
		config = config || {};
		
		Ext.applyIf(config, {
	        idProperty: 'id',
	        successProperty: 'success',
	        totalProperty: 'total'
	    });
	
		this.callParent([config]);
	},
	
	
	getResponseData: function(response){
		return response;
	},

	getData: function(data){
		var records = [], record, kv,
			f = this.readLines(data),
			l = f.length;

		for(var i = 0; i < l; i++){
			var kl = f[i].search(/[\s:=]/);
				record = {
				    value : this.clearValueExtraChars(f[i].substring(kl+1)),
				    key  :  this.clearKeyExtraChars(f[i].substring(0, kl))
				};
				records[i] = record;
		}
		return records;
	},
	
	createAccessor: function() {
        var re = /[\[\.]/;

        return function(expr) {
            if (Ext.isEmpty(expr)) {
                return Ext.emptyFn;
            }
            if (Ext.isFunction(expr)) {
                return expr;
            }
            if (this._useSimpleAccessors !== true) {
                var i = String(expr).search(re);
                if (i >= 0) {
                    return Ext.functionFactory('obj', 'return obj' + (i > 0 ? '.' : '') + expr);
                }
            }
            return function(obj) {
                return obj[expr];
            };
        };
    }(),
		
	clearKeyExtraChars: function(s){
		return (s ? s.replace(/[:=]/gi, "") : "");
	},
	
	clearValueExtraChars: function(s){
		return (s ? s.replace(/\\\s*\n/gi, "") : "");
	},
	
	//private
	readLines: function(file){
		return (file ? file.match(/.*(.*\\\s*\n)+.*|^((?!^\s*[#!]).).*$/gim) : []);
	}
	

});