import {BeanDescribe, PropertyDescribe} from "@palerock/annotate-js";


export class RegisterDescribe extends BeanDescribe {
}

export class MappingDescribe extends PropertyDescribe {
    method: string;
    url: string;
    headers: Object;
    resultType: string;
    alwaysNext: boolean;
    onMapping: (params: { app, mapped, decoratorParams, propertyMethod: Function }) => void;
    getInjectedParams: (params: { response, request, handleNext: Function }) => Object
}

export class GetMappingDescribe extends MappingDescribe {
}

export class PostMappingDescribe extends MappingDescribe {
}

export class PutMappingDescribe extends MappingDescribe {
}

export class DeleteMappingDescribe extends MappingDescribe {
}

export class UseMappingDescribe extends MappingDescribe {
}