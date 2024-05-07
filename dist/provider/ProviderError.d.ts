export declare class ProviderError extends Error {
    name: string;
    code?: number;
    data?: unknown;
    constructor(message: string, code?: number, data?: unknown);
}
