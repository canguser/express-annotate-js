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
            resultType: 'send',
            alwaysNext: false,
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

    get alwaysNext() {
        return this.getParams('alwaysNext')
    }

    onClassBuilt(propertyEntity, classDecorator) {
        super.onClassBuilt(propertyEntity, classDecorator);
        if (!(classDecorator instanceof RegisterDescribe)) {
            return;
        }
        this.targetBean = classDecorator.targetBean;
        const decoratorParams = classDecorator.params;
        const app = classDecorator.appLauncher;
        const mapped = propertyEntity.findAnnotationByType(Mapping);

        this.onMapping({app, mapped, decoratorParams});

    }

    onMapping({app, mapped, decoratorParams}) {
        const {prefix} = decoratorParams;
        const url = prefix + mapped.url;
        const propertyName = this.propertyEntity.name;
        const targetBean = this.targetBean;
        const initialValue = this.propertyEntity.initialValue;
        app[mapped.method](url, (request, response, next) => {
            let isNext = mapped.alwaysNext;
            response.set(this.headers);
            let propertyMethod = targetBean[propertyName];
            if (typeof propertyMethod !== 'function') {
                propertyMethod = () => initialValue;
            }
            Promise.resolve(
                propertyMethod.bind(targetBean)({
                    // inject body
                    ...this.getInjectedParams({
                        request, response, handleNext() {
                            isNext = true
                        }
                    })
                })).then(result => {
                if (isNext) {
                    request.additionParams = {
                        ...request.additionParams,
                        latestData: result
                    };
                    next();
                } else {
                    response[mapped.resultType](result);
                }
            });
        });
        console.log(`register - [${mapped.method}][${url}] `)
    }

    getInjectedParams({response = {}, request = {}, handleNext}) {
        const injector = new Injector();
        injector.inject(request.query);
        injector.inject(request.params);
        if (request.body && typeof request.body === 'object') {
            injector.inject(request.body || {});
        } else {
            injector.injectLocalKeyValue('body', request.body);
        }
        injector.injectLocalKeyValue('cookies', request.cookies);
        injector.injectLocal({
            request, response, handleNext
        });
        return injector.result();
    }
}


const Mapping = AnnotationGenerator.generate(MappingDescribe);

export {MappingDescribe, Mapping}