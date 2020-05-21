import express from 'express';
import {app} from '../launcher';
import {BeanDescribe, AnnotationGenerator} from "@palerock/annotate-js";

const launchedApp = app;

class RegisterDescribe extends BeanDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            prefix: '',
            port: 3000,
            multiService: false,
            parsingBody: true,
            tipTemplate: 'Example app listening on port http://localhost:{}'
        });
    }

    onCreated() {
        const option = this.params;
        this.appLauncher = option.multiService ? express() : launchedApp;
        super.onCreated();
        if (option.multiService) {
            const port = option.port;
            if (option.parsingBody) {
                app.use(express.json()); // for parsing application/json
                app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
            }
            app.listen(port, () => console.log(option.tipTemplate.replace('{}', port)));
        }
    }

    get defaultKey() {
        return 'prefix';
    }
}


const Register = AnnotationGenerator.generate(RegisterDescribe);

export {RegisterDescribe, Register}