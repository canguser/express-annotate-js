import {AnnotationGenerator} from "@palerock/annotate-js";
import {MappingDescribe} from "./Mapping";

class PostMappingDescribe extends MappingDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            resultType: 'json',
            method: 'post'
        });
    }
}


const PostMapping = AnnotationGenerator.generate(PostMappingDescribe);

export {PostMappingDescribe, PostMapping}