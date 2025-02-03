import { EventEmitter } from './EventEmitter';
import { WalletSDKConfig } from './WalletSDK';
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
 * @since 0.3.0 Added `eth_chainId`, `wallet_addEthereumChain` and `wallet_switchEthereumChain` methods
 */
export declare enum ProviderMethodNames {
    eth_requestAccounts = "eth_requestAccounts",
    eth_accounts = "eth_accounts",
    personal_sign = "personal_sign",
    eth_sendTransaction = "eth_sendTransaction",
    gws_disconnect = "gws_disconnect",
    eth_chainId = "eth_chainId",
    wallet_addEthereumChain = "wallet_addEthereumChain",
    wallet_switchEthereumChain = "wallet_switchEthereumChain"
}
export declare namespace ProviderRequestResults {
    type eth_accounts = string[];
    type eth_requestAccounts = string[];
    type personal_sign = string;
    type eth_sendTransaction = string;
    type disconnect = boolean;
    type wallet_switchEthereumChain = null;
    type wallet_addEthereumChain = null;
    type eth_chainId = string;
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
    private config;
    constructor(config: WalletSDKConfig);
    restoreConnection(): void;
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
    /**
     * @summary Sends a request to the provider (legacy)
     * @public
     * @param {ProviderRequestArguments} args Request arguments
     * @param {string} args.method The method name
     * @param {ProviderRequestArgumentsParams} args.params The method parameters
     * @param {Function} callback The callback function
     * @deprecated Use `request` method instead
     * @since 0.5.4
     * @returns {void} `void`
     */
    sendAsync({ method, params }: ProviderRequestArguments, callback: Function): void;
    private storage;
    private rpc;
    /**
     * @summary Switches the chain
     * @since 0.3.0
     * @param {string} chainId Chain id in hex format
     * @returns {null} `Null` on success
     */
    private switchChain;
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
