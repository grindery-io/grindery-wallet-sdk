import { EventEmitter } from './EventEmitter';
/**
 * @summary The Grindery wallet provider methods
 * @since 0.2.0
 */
export type ProviderMethods = {
    [name in ProviderMethodNames]: (params?: ProviderRequestArgumentsParams) => Promise<unknown>;
};
/**
 * @summary The Grindery wallet provider method names
 * @since 0.2.0
 */
export declare enum ProviderMethodNames {
    eth_requestAccounts = "eth_requestAccounts",
    eth_accounts = "eth_accounts",
    personal_sign = "personal_sign",
    eth_sendTransaction = "eth_sendTransaction",
    gws_disconnect = "gws_disconnect"
}
export declare namespace ProviderRequestResults {
    type eth_accounts = string[];
    type eth_requestAccounts = string[];
    type personal_sign = string;
    type eth_sendTransaction = string;
    type disconnect = boolean;
}
/**
 * @summary The Grindery wallet provider method names
 * @since 0.2.0
 */
export type ProviderMethodName = keyof typeof ProviderMethodNames;
/**
 * @summary The Grindery wallet provider request params
 * @since 0.2.0
 */
export type ProviderRequestArgumentsParams = readonly unknown[] | object;
/**
 * @summary The Grindery wallet provider request arguments
 * @since 0.2.0
 */
export interface ProviderRequestArguments {
    readonly method: ProviderMethodName;
    readonly params?: ProviderRequestArgumentsParams;
}
/**
 * @summary The base wallet provider class
 * @since 0.2.0
 * @extends EventEmitter
 */
export declare class Provider extends EventEmitter {
    isGrinderyWallet: boolean;
    constructor();
    /**
     * @public
     * @returns {boolean} True if the provider is connected to the server.
     */
    isConnected(): boolean;
    /**
     * @summary Sends a request to the provider
     * @public
     * @param {ProviderRequestArguments} args Request arguments
     * @param {string} args.method The method name
     * @param {ProviderRequestArgumentsParams} args.params The method parameters
     * @returns {T} The result of the request
     */
    request<T>({ method, params, }: ProviderRequestArguments): Promise<T>;
    private storage;
    private rpc;
    /**
     * @summary The list of supported provider methods.
     * @private
     */
    private methods;
    /**
     * @summary Restores the pairing process if pairing token is stored in the local storage
     * @private
     * @returns {void}
     */
    private restorePairing;
    /**
     * @summary Restores the session if session Id is stored in the local storage
     * @private
     * @returns {void}
     */
    private restoreSession;
    /**
     * @summary Injects the provider into the window object
     * @private
     * @returns {void}
     */
    private injectProvider;
    /**
     * @summary Announces the provider to the window object
     * @private
     * @since 0.1.1
     * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
     * @returns {void}
     */
    private announceProvider;
    /**
     * @summary Listens for the request provider events
     * @private
     * @since 0.1.1
     * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
     * @returns {void}
     */
    private listenForRequestProviderEvents;
}
