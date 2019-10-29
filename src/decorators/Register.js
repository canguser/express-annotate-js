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
        const option = this.params;
        this.appLauncher = option.multiService ? express() : launchedApp;
        super.onCreated();
        if (option.multiService) {
            const port = option.port;
            app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}!`));
        }
    }
}


const Register = AnnotationGenerator.generate(RegisterDescribe);

export {RegisterDescribe, Register}