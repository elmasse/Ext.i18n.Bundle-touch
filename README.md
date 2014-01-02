# Ext.i18n.Bundle
##v0.4

Ext.i18n.Bundle allows to use properties files (or bundle files) from Java to use them as i18n resources with Sencha Touch.

### Example

````javascript
Ext.application({
    name: 'AppTest',

    //1
    requires: ['Ext.i18n.Bundle'],

    //2
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
                    title: {type: 'bundle', key: 'panel.title'}  //3
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
`````
	
Using Ext.i18n.Bundle is very simple. You just need to config your bundle instance. In this case we want to retrieve a bundle file called Application for Spanish language - es-ES - located at resources path. This will load a file called Application_es-ES.properties:

````
GET http://yourdomain/resources/Application_es-ES.properties
````

In case this file doesn't exist, then the bundle will try at:

````
GET http://yourdomain/resources/Application.properties
````
for the default bundle file.

The steps are the following:

1 - Declare the Ext.i18n.Bundle as required.  
2 - Define the bundle instance for the current application using the config options.  
3 - You can use a lazy initialization object to get bundle keys by specifying the type and key.  
4 - You can use the bundle instance from a tpl method if you want too.  

The bundle instance is attached to the current Application instance, which you can access at `<Your App Name>.app.bundle` in the example we have `AppTest.app.bundle`.

**Note**: It is important to notice that bundle will be ready after the data is loaded. That's why the lazy initialization objects help to declare them in the config section of your components.
In case you want to access the keys by code, you have to do it inside a class method such as constructor or initialize methods.

**DO NOT DO THIS:**

````
Ext.define('MyView', {
	extends: 'Ext.Panel',
	
	config: {
		html: AppTest.app.bundle.getMsg('my.html') + ' - this is mixed content'
	}
});

````

**DO THIS:**

````
Ext.define('MyView', {
	extends: 'Ext.Panel',
	
	config: {/* ... */}

	initialize: function() {
		this.setHtml(AppTest.app.bundle.getMsg('my.html') + ' - this is mixed content');
	}	
});

````

It is important to notice as well that bundle lazy initialization objects cannot be mixed with text:

**NOT VALID:**

````
Ext.define('MyView', {
    extends: 'Ext.Panel',
    
    config: {
        html: {type: 'bundle', key: 'my.html'} + ' - this is mixed content' // wrong!!!
    }
});
````

##Release Notes

###v0.4
* Sencha Touch 2.3 compat
* Added bundle as part of the Ext.application definition
* Now you can use {type: 'bundle', key: 'key'} object to lazy instantiate your keys

###v0.3.2
* Sencha Touch 2 Beta1 compatible code.


###v0.3.1
* Sencha Touch 2 PR4 compatible code.
* Patch for PhoneGap.  PhoneGap is using XHR thru file:// protocol then AjaxProxy doesn't retrieve data.

###v0.3
* Sencha Touch 2 PR3 comaptible code.
* Removed config method. All the requests are made using GET method.
* Solved issue with extra arguments passed to URL. Now you have no limits, start nor group extra parameters in URL.

	