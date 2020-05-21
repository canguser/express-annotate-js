import {AnnotationGenerator} from "@palerock/annotate-js";
import {MappingDescribe} from "./Mapping";

class PutMappingDescribe extends MappingDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            resultType: 'json',
            method: 'put'
        });
    }
}


const PutMapping = AnnotationGenerator.generate(PutMappingDescribe);

export {PutMappingDescribe, PutMapping}