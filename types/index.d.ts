export {
    RegisterDescribe,
    MappingDescribe,
    DeleteMappingDescribe,
    GetMappingDescribe,
    PostMappingDescribe,
    PutMappingDescribe,
    UseMappingDescribe
} from "./describe";

export {
    Register,
    Mapping,
    DeleteMapping,
    GetMapping,
    PostMapping,
    PutMapping,
    UseMapping
} from "./annotate";

export class launcher {
    static start: (port: number) => void
}

export const app: Object;

export function express(): Object;