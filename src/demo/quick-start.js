import {Register} from "../decorators/Register";
import {Autowired, Bean, Boot} from "@palerock/annotate-js";
import {GetMapping} from "../decorators/GetMapping";
import {launcher} from "../launcher";

@Register
class DemoController {

    @Autowired
    DemoService;

    @GetMapping({url: '/'})
    getContent({content}) {
        return `Hello Express Annotate JS, ${this.DemoService.parseContent(content)}`;
    }

}

@Bean
class DemoService {
    parseContent(content) {
        return `Parsed content: ${content}`;
    }
}

@Boot
class Application {

    port = 3034;

    main() {
        launcher.start(this.port);
    }

}