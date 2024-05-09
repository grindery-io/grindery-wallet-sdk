/**
 * @summary Error class for GrinderyWalletProvider
 * @since 0.1.0
 * @extends Error
 */
export declare class ProviderError extends Error {
    name: string;
    code?: number;
    data?: unknown;
    constructor(message: string, code?: number, data?: unknown);
}
