# Ext.i18n.Bundle

This is a experimental branch to use CSS content for i18n!!!!!
	
Using Ext.i18n.Bundle is very simple. You just need to create your bundle instance. In this case we want to retrieve a bundle file called Application for Spanish language - es-ES - located at resources path. This will load a file called Application_es-ES.properties:

GET http://yourdomain/resources/Application_es-ES.properties

In case this file doesn't exist, then the bundle will try at:

GET http://yourdomain/resources/Application.properties

for the default bundle file.


