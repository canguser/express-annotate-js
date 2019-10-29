import {Injector, PropertyDescribe} from "@palerock/annotate-js";
import {AnnotationGenerator} from "@palerock/annotate-js";
import {RegisterDescribe} from "./Register";

class MappingDescribe extends PropertyDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            method: 'get',
            url: '/',
            headers: {},
            resultType: 'send'
        });
    }

    get method() {
        return this.getParams('method');
    }

    get url() {
        return this.getParams('url');
    }

    get headers() {
        return this.getParams('headers');
    }

    get resultType() {
        return this.getParams('resultType');
    }

    get defaultKey() {
        return 'url';
    }

    onClassBuilt(propertyEntity, classDecorator) {
        super.onClassBuilt(propertyEntity, classDecorator);
        if (!(classDecorator instanceof RegisterDescribe)) {
            return;
        }
        const {prefix} = classDecorator.params;
        const app = classDecorator.appLauncher;
        const mapped = propertyEntity.findAnnotationByType(Mapping);
        const url = prefix + mapped.url;
        app[mapped.method](url, (request, response) => {
            const injector = new Injector();
            injector.inject(request.query);
            injector.inject(request.params);
            injector.injectLocalKeyValue('cookies', request.cookies);
            injector.injectLocal({request, response});
            // inject body
            Promise.resolve(classDecorator.targetBean[propertyEntity.name]({
                ...injector.result()
            })).then(result => {
                response[mapped.resultType](result);
            });
        });
        console.log(`register - [${url}] `)
    }
}


const Mapping = AnnotationGenerator.generate(MappingDescribe);

export {MappingDescribe, Mapping}