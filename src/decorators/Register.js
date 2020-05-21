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
            multiService: false
        });
    }

    onCreated() {
        const option = this.params;
        this.appLauncher = option.multiService ? express() : launchedApp;
        super.onCreated();
        if (option.multiService) {
            const port = option.port;
            app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));
        }
    }

    get defaultKey() {
        return 'prefix';
    }
}


const Register = AnnotationGenerator.generate(RegisterDescribe);

export {RegisterDescribe, Register}