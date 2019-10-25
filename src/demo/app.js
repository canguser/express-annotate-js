import {Register} from "../decorators/Register";
import {Mapping} from "../decorators/Mapping";
import {Autowired, Bean, Boot} from "@palerock/annotate-js";
import {launcher} from "../launcher";


@Bean
class Configuration {
    port = 8081;

    @Autowired({beanName: 'HelloWorld', isMapProperty: true})
    sayHello;

    @Autowired({beanName: 'bootBean', propertyName: 'port', isMapProperty: true})
    syncPort;
}

@Register
class HelloWorld {

    @Mapping
    sayHello() {
        return 'hello express-annotate!';
    }

}


@Boot
class BootApplication {

    @Autowired('Configuration')
    config;

    @Autowired({beanName: 'Configuration', isMapProperty: true})
    port;

    main() {
        console.log(this.config, this.port);
        console.log(this.config.sayHello());
        console.log(this.config.syncPort);
        launcher.start(this.port);
    }
}