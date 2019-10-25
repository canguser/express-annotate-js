import {Register} from "../decorators/Register";
import {Mapping} from "../decorators/Mapping";
import {Autowired, Bean, Boot} from "@palerock/annotate-js";
import {launcher} from "../launcher";


@Bean
class Configuration {
    port = 8081;
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

    main() {
        launcher.start(this.config.port);
    }
}