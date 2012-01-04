Ext.data.AjaxProxy.override({
	
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        
        return function(options, success, response) {

            if (success === true || (response.status === 0 && response.responseText !== "" )) { //fixing xhr to local files
                var reader  = me.getReader(),
                    result  = reader.read(response),
                    records = result.records,
                    length  = records.length,
                    mc      = new Ext.util.MixedCollection(true, function(r) {return r.getId();}),
                    record, i;
                mc.addAll(operation.records);
                            
                for (i = 0; i < length; i++) {
                    record = mc.get(records[i].getId());
                    
                    if (record) {
                        record.set(record.data);
                    }
                }

                //see comment in buildRequest for why we include the response object here
                Ext.apply(operation, {
                    response : response,
                    resultSet: result
                });
                
                operation.setCompleted();
                operation.setSuccessful();
            } else {
                me.fireEvent('exception', this, response, operation);
                
                //TODO: extract error message from reader
                operation.setException();                
            }
            
            //this callback is the one that was passed to the 'read' or 'write' function above
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }
            
            me.afterRequest(request, true);
        };
    }	
	
});