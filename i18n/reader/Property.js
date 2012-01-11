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
	
	read: function(response){
		var propertyFile = response.responseText;
		if(!propertyFile)
			throw {message: "PropertyReader.read: File not found"};
						
		return this.readRecords(propertyFile);
	},
	
	readRecords: function(propertyFile){
		var Record = this.recordType,
			Model = this.model,
			records = [], record, kv,
			f = this.readLines(propertyFile),
			l = f.length;
		
		for(var i = 0; i < l; i++){
			var kl = f[i].search(/[\s:=]/);
				record = new Model({
				    value : this.clearValueExtraChars(f[i].substring(kl+1)),
				    key  :  this.clearKeyExtraChars(f[i].substring(0, kl))
				});

				records[i] = record;
		}
		
		return Ext.create('Ext.data.ResultSet', {
            total  : records.length,
            count  : records.length,
            records: records,
            success: true
        });
	},
	
	createAccessor: function(){},
	
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