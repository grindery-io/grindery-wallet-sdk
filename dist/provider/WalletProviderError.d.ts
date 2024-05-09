/**
 * @summary Error class for WalletProvider
 * @since 0.1.0
 * @extends Error
 */
export declare class WalletProviderError extends Error {
    name: string;
    code?: number;
    data?: unknown;
    constructor(message: string, code?: number, data?: unknown);
}
