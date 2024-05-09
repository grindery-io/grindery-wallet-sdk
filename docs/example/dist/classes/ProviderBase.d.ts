import { ProviderLocalStorage } from './LocalStorage';
import { GrinderyRpcMethodName, GrinderyRpcProviderRequestMethodName, ProviderMethods, ProviderRequestResult, RequestArguments, RequestArgumentsParams } from '../types';
import { ProviderError } from './ProviderError';
/**
 * @summary The provider base class
 * @since 0.1.0
 * @extends ProviderLocalStorage
 */
export declare class ProviderBase extends ProviderLocalStorage {
    constructor();
    /**
     * @public
     * @returns {boolean} True if the provider is connected to the server.
     */
    isConnected(): boolean;
    /**
     * @public
     * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
     */
    isWalletConnected(): boolean;
    /**
     * @public
     * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
     */
    isWalletConnectionPending(): boolean;
    /**
     * @summary Gets the connected chain ID in hex format
     * @public
     * @returns {string} The chain ID in hex format
     */
    getChain(): string;
    /**
     * @summary Gets the connected user's wallet address
     * @public
     * @returns {string} The ethereum wallet address
     */
    getAddress(): string;
    /**
     * @summary Sends a request to the provider
     * @public
     * @param {RequestArguments} args Request arguments
     * @param {string} args.method The method name
     * @param {RequestArgumentsParams} args.params The method parameters
     * @returns {T} The result of the request
     */
    request<T>({ method, params }: RequestArguments): Promise<T>;
    /**
     * @summary Sends a provider request to the Grindery RPC API and waits for the result.
     * @public
     * @param {GrinderyRpcProviderRequestMethodName} method Provider request method name
     * @param {Array} params Provider request parameters
     * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
     * @returns The result of the provider request
     */
    sendAndWaitGrinderyRpcProviderRequest<T>(method: GrinderyRpcProviderRequestMethodName, params?: readonly unknown[], timeout?: number): Promise<T>;
    /**
     * @summary The application ID.
     * @protected
     */
    protected appId: string;
    /**
     * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
     * @protected
     */
    protected chainId: string;
    /**
     * @summary The list of supported provider methods.
     * @protected
     */
    protected methods: ProviderMethods;
    /**
     * @summary The user's wallet addresses list.
     * @protected
     */
    protected accounts: string[];
    /**
     * @summary Registers the provider methods.
     * @protected
     * @param {ProviderMethods} methods A map of supported provider methods.
     * @returns {void}
     */
    protected registerProviderMethods(methods: ProviderMethods): void;
    /**
     * @summary Sends a provider request to the Grindery RPC API.
     * @protected
     * @param {GrinderyRpcProviderRequestMethodName} method Provider request method name
     * @param {Array} params Provider request parameters
     * @returns {ProviderRequestResult} The request token to use in the `waitGrinderyRpcProviderRequest` method
     */
    protected sendGrinderyRpcProviderRequest(method: GrinderyRpcProviderRequestMethodName, params?: readonly unknown[]): Promise<ProviderRequestResult>;
    /**
     * @summary Waits for the result of the provider request.
     * @protected
     * @param {string} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
     * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
     * @returns The result of the provider request
     */
    protected waitGrinderyRpcProviderRequest<T>(requestToken: string, timeout?: number): Promise<T>;
    /**
     * @summary Sends a request to the Grindery Walletconnect RPC API.
     * @protected
     * @param {GrinderyRpcMethodName} method Request method name
     * @param {RequestArgumentsParams} params Request parameters
     * @returns {T} The result of the request
     */
    protected sendGrinderyRpcApiRequest<T>(method: GrinderyRpcMethodName, params?: RequestArgumentsParams): Promise<T>;
    /**
     * @summary Creates a provider error from an unknown error
     * @protected
     * @param {unknown} error Optional. Error object.
     * @returns {ProviderError} The provider error
     */
    protected createProviderRpcError(error?: unknown): ProviderError;
    /**
     * @summary Injects the provider into the window object
     * @private
     * @returns {void}
     */
    private injectProvider;
}