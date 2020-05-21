import {Mapping, MappingDescribe} from "./decorators/Mapping";
import {Register, RegisterDescribe} from "./decorators/Register";
import {launcher, app, express} from "./launcher";
import {PostMapping, PostMappingDescribe} from "./decorators/PostMapping";
import {GetMapping, GetMappingDescribe} from "./decorators/GetMapping";
import {PutMapping, PutMappingDescribe} from "./decorators/PutMapping";
import {DeleteMapping, DeleteMappingDescribe} from "./decorators/DeleteMapping";
import {UseMapping, UseMappingDescribe} from "./decorators/UseMapping";

exports.Mapping = Mapping;
exports.Register = Register;
exports.launcher = launcher;
exports.PostMapping = PostMapping;
exports.GetMapping = GetMapping;
exports.PutMapping = PutMapping;
exports.UseMapping = UseMapping;
exports.DeleteMapping = DeleteMapping;
exports.MappingDescribe = MappingDescribe;
exports.RegisterDescribe = RegisterDescribe;
exports.PostMappingDescribe = PostMappingDescribe;
exports.GetMappingDescribe = GetMappingDescribe;
exports.PutMappingDescribe = PutMappingDescribe;
exports.DeleteMappingDescribe = DeleteMappingDescribe;
exports.UseMappingDescribe = UseMappingDescribe;
exports.app = app;
exports.express = express;
