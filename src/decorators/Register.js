import express from 'express';
import {app} from '../launcher';
import {BeanDescribe, AnnotationUtils, Injector, AnnotationGenerator} from "@palerock/annotate-js";
import {Mapping} from "./Mapping";

const launchedApp = app;

class RegisterDescribe extends BeanDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            port: 3000,
            prefix: '',
            multiService: false
        });
    }

    onCreated() {
        super.onCreated();
        const mappingProperties = AnnotationUtils.getClassEntity(this.originInstance)
            .properties.filter(
                property => property.hasAnnotations(Mapping)
            );
        const option = this.params;
        const app = option.multiService ? express() : launchedApp;
        mappingProperties.forEach(mapping => {
            const mapped = mapping.findAnnotationByType(Mapping);
            const url = option.prefix + mapped.url;
            app[mapped.method](url, (request, response) => {
                const injector = new Injector();
                injector.inject(request.query);
                injector.inject(request.params);
                injector.injectLocalKeyValue('cookies', request.cookies);
                injector.injectLocal({request, response});
                // inject body
                let result = this.targetBean[mapping.name]({
                    ...injector.result()
                });
                response[mapped.resultType](result);
            });
            console.log(`register - [${url}] `)
        });
        if (option.multiService) {
            const port = option.port;
            app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));
        }
    }
}


const Register = AnnotationGenerator.generate(RegisterDescribe);

export {RegisterDescribe, Register}