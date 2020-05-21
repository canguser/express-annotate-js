import {AnnotationGenerator} from "@palerock/annotate-js";
import {MappingDescribe} from "./Mapping";

class UseMappingDescribe extends MappingDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            method: 'use',
            alwaysNext: true
        });
    }
}


const UseMapping = AnnotationGenerator.generate(UseMappingDescribe);

export {UseMappingDescribe, UseMapping}