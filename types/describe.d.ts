import {BeanDescribe, PropertyDescribe} from "@palerock/annotate-js";


export class RegisterDescribe extends BeanDescribe {
}

export class MappingDescribe extends PropertyDescribe {
    get method(): string;

    get url(): string;

    get headers(): Object;

    get resultType(): string;

    get alwaysNext(): boolean;

    onMapping(params: { app, mapped, decoratorParams, propertyMethod: Function }): void;
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