import {AnnotationGenerator} from "@palerock/annotate-js";
import {MappingDescribe} from "./Mapping";

class DeleteMappingDescribe extends MappingDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            resultType: 'json',
            method: 'delete'
        });
    }
}


const DeleteMapping = AnnotationGenerator.generate(DeleteMappingDescribe);

export {DeleteMappingDescribe, DeleteMapping}