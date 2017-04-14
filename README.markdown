# Single Page Application with Java EE 7
Simple single page application build with Java EE 7 as the back-end and AngularJS 1.6.0 for the client side. Consist two projects, but in the end client-side will be build and copied into back-end directory in order to deploy into Application Server.

## Prerequitise

* openJDK / JDK ver 8.
* Apache Maven.
* NPM, GRUNT, Bower.
* Application Server (Tested with Wildfly 10 & Payara 4)

## NOTES: Datasource Configuration

I leaved the `persistence.xml` without JNDI datasource since you need to configure it following what you need, but if you want to using the default Database from the Application Server (H2 on Wildfly, Derby on Payara) you can put this on your `persistence.xml`.

* Wildfly: `<jta-data-source>java:jboss/datasources/ExampleDS</jta-data-source>`
* Payara: `<jta-data-source>jdbc/sample</jta-data-source>`
