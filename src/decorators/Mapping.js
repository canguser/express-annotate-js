import {BasicAnnotationDescribe} from "@palerock/annotate-js";
import {AnnotationGenerator} from "@palerock/annotate-js";

class MappingDescribe extends BasicAnnotationDescribe {

    constructor() {
        super();
        Object.assign(this.params, {
            method: 'get',
            url: '/',
            headers: {},
            resultType: 'send'
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
}


const Mapping = AnnotationGenerator.generate(MappingDescribe);

export {MappingDescribe, Mapping}