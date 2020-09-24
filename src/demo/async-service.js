import "@babel/polyfill";
import {Register} from "../decorators/Register";
import {Autowired, Bean, Boot, EnergyWire} from "@palerock/annotate-js";
import {GetMapping} from "../decorators/GetMapping";
import {launcher} from "../launcher";

@Register
class AsyncController {

    @Autowired // 注入 APIService
    APIService;

    @GetMapping({url: '/project/:id'}) // 使用 :id 将 URL 中的 id 映射为参数并注入到方法中
    async getProject({id}) {
        return this.APIService.getProjectCache(id);
    }

}

@Bean
class APIService {

    // 注入 Utils 中的 wait 方法
    @EnergyWire('Utils')
    wait;

    // 缓存用于返回
    projectCacheMap = {
        '1': {
            name: 'Project 01'
        },
        '2': {
            name: 'project 02'
        }
    };

    async getProjectCache(id) {
        await this.wait(2000); // 等待 2s
        if (id in this.projectCacheMap) {
            return this.projectCacheMap[id];
        }
        return null;
    }

}

@Bean
class Utils {
    async wait(ms) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), ms);
        })
    }
}

@Boot
class Application {

    port = 3034;

    main() {
        launcher.start(this.port);
    }

}