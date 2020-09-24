export function Register(params?: {
    prefix?: '',
    port?: 3000,
    multiService?: false,
    parsingBody?: true,
    tipTemplate?: 'Example app listening on port http://localhost:{}'
} | string): void;

export function Mapping(params?: {
    method?: 'get',
    url?: '/',
    headers?: {},
    resultType?: 'send',
    alwaysNext?: false,
    priority?: number
} | string): void;

export function GetMapping(params?: {
    url?: '/',
    headers?: {},
    resultType?: 'json',
    alwaysNext?: false,
    priority?: number
} | string): void;

export function PostMapping(params?: {
    url?: '/',
    headers?: {},
    resultType?: 'json',
    alwaysNext?: false,
    priority?: number
} | string): void;

export function PutMapping(params?: {
    url?: '/',
    headers?: {},
    resultType?: 'json',
    alwaysNext?: false,
    priority?: number
} | string): void;

export function DeleteMapping(params?: {
    url?: '/',
    headers?: {},
    resultType?: 'json',
    alwaysNext?: false,
    priority?: number
} | string): void;

export function UseMapping(params?: {
    url?: '/',
    headers?: {},
    resultType?: 'json',
    priority?: number
} | string): void;
