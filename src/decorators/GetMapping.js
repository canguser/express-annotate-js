import {AnnotationGenerator} from "@palerock/annotate-js";
import {MappingDescribe} from "./Mapping";

class GetMappingDescribe extends MappingDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            resultType: 'json',
            method: 'get'
        });
    }
}


const GetMapping = AnnotationGenerator.generate(GetMappingDescribe);

export {GetMappingDescribe, GetMapping}