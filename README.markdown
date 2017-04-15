# Single Page Application with Java EE 7
Simple single page application build with Java EE 7 as the back-end and AngularJS 1.6.0 for the client side. Consist two projects, but in the end client-side will be build and copied into back-end directory in order to deploy into Application Server.

## Prerequitise

* openJDK / JDK ver 8.
* Apache Maven.
* NPM, GRUNT, Bower.
* Application Server (Tested with Wildfly 10 & Payara 4)

## Manual Documentations
This project was tested with Payara 4, but it's should work with other application server and make sure to configure the `persistence.xml` regarding the JTA datasources. Make sure to execute command `npm install` and `bower install` in **Client** directory. Below is how to run this project.

1. Execute `grunt build` in **Client** directory. This command will automatically copy the front-end into `webapp` directory of Java EE.
2. Execute `mvn clean install` in **Server**. Deploy `war` files from target directory into application server.

## NOTES: Datasource Configuration

I leaved the `persistence.xml` without JNDI datasource since you need to configure it following what you need, but if you want to using the default Database from the Application Server (H2 on Wildfly, Derby on Payara) you can put this on your `persistence.xml`.

* Wildfly: `<jta-data-source>java:jboss/datasources/ExampleDS</jta-data-source>`
* Payara: `<jta-data-source>jdbc/sample</jta-data-source>`
