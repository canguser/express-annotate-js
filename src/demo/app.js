import {Register, RegisterDescribe} from "../decorators/Register";
import {Mapping} from "../decorators/Mapping";
import {Autowired, Bean, Boot, AnnotationGenerator, SectionDescribe, EnergyWire} from "@palerock/annotate-js";
import {launcher} from "../launcher";
import {GetMapping} from "../decorators/GetMapping";

const LogCallMethod = AnnotationGenerator.generate(
    class LogCallMethod extends SectionDescribe {
        constructor() {
            super();
            this.params.before = ({origin}) => {
                console.log(origin.name, 'called');
            }
        }
    },[RegisterDescribe]
);

@Bean
class Configuration {
    port = 8081;

    @Autowired({beanName: 'HelloWorld', isMapProperty: true})
    sayHello;

    @Autowired({beanName: 'bootBean', propertyName: 'port', isMapProperty: true})
    syncPort;
}


function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms)
    })
}

@LogCallMethod
class HelloWorld {

    @GetMapping

    sayHello(params) {
        console.log(this);
        return wait(3000).then(() => 'hello express-annotate!');
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
