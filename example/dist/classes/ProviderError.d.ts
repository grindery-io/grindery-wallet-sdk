/**
 * @summary Error class for wallet Provider
 * @since 0.1.0
 * @extends Error
 */
export declare class ProviderError extends Error {
    name: string;
    code?: number;
    data?: unknown;
    constructor(message: string, code?: number, data?: unknown);
}
export declare const ProviderErrors: {
    PairingFailed: ProviderError;
    Disconnected: ProviderError;
    UnsupportedMethod: ProviderError;
    Unauthorized: ProviderError;
    NoResult: ProviderError;
    NoAppId: ProviderError;
};
export declare const newProviderError: (error?: unknown) => ProviderError;
