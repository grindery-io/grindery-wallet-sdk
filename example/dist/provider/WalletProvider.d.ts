import { WalletProviderLocalStorage } from './WalletProviderLocalStorage';
import { Address, ChainId, GrinderyRpcMethodName, GrinderyRpcProviderRequestMethodName, ProviderMethods, ProviderRequestResult, RequestArguments, RequestArgumentsParams, RequestToken } from '../types';
import { WalletProviderError } from './WalletProviderError';
/**
 * @summary The Grindery RPC API method names
 */
export declare enum GrinderyRpcMethodNames {
    requestPairing = "requestPairing",
    waitForPairingResult = "waitForPairingResult",
    request = "request",
    waitForRequestResult = "waitForRequestResult",
    'disconnect' = "disconnect"
}
/**
 * @summary The base wallet provider class
 * @since 0.1.0
 * @extends WalletProviderLocalStorage
 */
export declare class WalletProvider extends WalletProviderLocalStorage {
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
     * @returns {ChainId} The chain ID in hex format
     */
    getChain(): ChainId;
    /**
     * @summary Gets the connected user's wallet address
     * @public
     * @returns {Address} The ethereum wallet address
     */
    getAddress(): Address;
    /**
     * @summary Sets the application ID
     * @public
     * @param {string} appId The application ID
     * @returns {string} The application ID
     */
    setAppId(appId: string): string;
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
    protected chainId: ChainId;
    /**
     * @summary Client id
     * @protected
     */
    protected clientId: string;
    /**
     * @summary The list of supported provider methods.
     * @protected
     */
    protected methods: Partial<ProviderMethods>;
    /**
     * @summary The user's wallet addresses list.
     * @protected
     */
    protected accounts: Address[];
    protected setAccounts(accounts: Address[]): Address[];
    /**
     * @summary Registers the provider methods.
     * @protected
     * @param {ProviderMethods} methods A map of supported provider methods.
     * @returns {void}
     */
    protected registerProviderMethods(methods: Partial<ProviderMethods>): void;
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
     * @param {RequestToken} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
     * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
     * @returns The result of the provider request
     */
    protected waitGrinderyRpcProviderRequest<T>(requestToken: RequestToken, timeout?: number): Promise<T>;
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
     * @returns {WalletProviderError} The provider error
     */
    protected createProviderRpcError(error?: unknown): WalletProviderError;
    /**
     * @summary Injects the provider into the window object
     * @private
     * @returns {void}
     */
    private injectProvider;
}
