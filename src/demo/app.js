import {Register} from "../decorators/Register";
import {Mapping} from "../decorators/Mapping";
import {Autowired, Bean, Boot, AnnotationGenerator, SectionDescribe, EnergyWire} from "@palerock/annotate-js";
import {launcher} from "../launcher";

const LogCallMethod = AnnotationGenerator.generate(
    class LogCallMethod extends SectionDescribe {
        constructor() {
            super();
            this.params.before = ({origin}) => {
                console.log(origin.name, 'called');
            }
        }
    }
);

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
    @LogCallMethod
    sayHello() {
        return 'hello express-annotate!';
    }

}


@Boot
class BootApplication {

    @Autowired('Configuration')
    config;

    @EnergyWire('Configuration')
    port;

    main() {
        console.log(this.config, this.port);
        console.log(this.config.sayHello());
        console.log(this.config.syncPort);
        launcher.start(this.port);
    }
}
