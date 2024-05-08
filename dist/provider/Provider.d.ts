import { ProviderError } from './ProviderError';
import { ProviderLocalStorage } from './ProviderLocalStorage';
import { GrinderyRpcMethodName, GrinderyRpcProviderRequestMethodName, ProviderMethods, ProviderRequestResult, RequestArguments, RequestArgumentsParams } from './types';
export declare class Provider extends ProviderLocalStorage {
    constructor();
    /**
     * @returns {boolean} True if the provider is connected to the server.
     */
    isConnected(): boolean;
    /**
     * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
     */
    isWalletConnected(): boolean;
    /**
     * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
     */
    isWalletConnectionPending(): boolean;
    request<T>({ method, params }: RequestArguments): Promise<T>;
    /**
     * @summary The application ID.
     */
    protected appId: string;
    /**
     * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
     */
    protected chainId: string;
    /**
     * @summary The list of supported provider methods.
     */
    protected methods: ProviderMethods;
    protected registerProviderMethods(methods: ProviderMethods): void;
    protected sendGrinderyRpcProviderRequest(method: GrinderyRpcProviderRequestMethodName, params?: readonly unknown[]): Promise<ProviderRequestResult>;
    protected waitGrinderyRpcProviderRequest<T>(requestToken: string, timeout?: number): Promise<T>;
    protected sendGrinderyRpcApiRequest<T>(method: GrinderyRpcMethodName, params?: RequestArgumentsParams): Promise<T>;
    protected createProviderRpcError(error: unknown): ProviderError;
    private injectProvider;
}
