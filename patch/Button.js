Ext.define('patch.Button', {
	override: 'Ext.Button',
	
	updateText: function(text) {
        var element = this.textElement;

        if (text) {
            element.show();
            element.setHtml(text);
        }
        else {
            element.hide();
        }
    }
})