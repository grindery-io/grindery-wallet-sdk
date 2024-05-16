/**
 * @summary The Grindery RPC API method names
 */
export declare enum RpcMethodNames {
    requestPairing = "requestPairing",
    waitForPairingResult = "waitForPairingResult",
    request = "request",
    waitForRequestResult = "waitForRequestResult",
    'disconnect' = "disconnect"
}
/**
 * @summary The Grindery RPC API request results
 * @since 0.2.0
 */
export declare namespace RpcRequestResults {
    /**
     * @summary `waitForPairingResult` method result
     */
    type waitForPairingResult = {
        session: {
            expiry: number;
            sessionId: string;
            namespaces: {
                [key: string]: {
                    accounts: string[];
                    chains: string[];
                    events: string[];
                    methods: string[];
                };
            };
        };
    };
    /**
     * @summary `requestPairing` method result
     */
    type requestPairing = {
        pairingToken: string;
        connectUrl: string;
        connectUrlBrowser: string;
        shortToken: string;
    };
    /**
     * @summary `request` method result
     */
    type request = {
        requestToken: string;
    };
    /**
     * @summary `waitForRequestResult` method result
     */
    type waitForRequestResult = any;
    /**
     * @summary `disconnect` method result
     */
    type disconnect = boolean;
}
/**
 * @summary The Grindery RPC API wrapper class
 * @since 0.2.0
 */
export declare class Rpc {
    /**
     * @summary Sends a provider request to the Grindery RPC API and waits for the result.
     * @public
     * @param {RpcMethodNames} method Provider request method name
     * @param {Array} params Provider request parameters
     * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
     * @returns The result of the provider request
     */
    sendAndWaitRpcRequest<T>(method: string, params?: readonly unknown[], timeout?: number): Promise<T>;
    /**
     * @summary Sends a provider request to the Grindery RPC API.
     * @protected
     * @param {RpcMethodNames} method Provider request method name
     * @param {Array} params Provider request parameters
     * @returns {RpcRequestResults.request} Promise resolving with the request token to use in the `waitGrinderyRpcProviderRequest` method
     */
    protected sendRpcRequest(method: string, params?: readonly unknown[]): Promise<RpcRequestResults.request>;
    /**
     * @summary Waits for the result of the provider request.
     * @protected
     * @param {string} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
     * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
     * @returns The result of the provider request
     */
    protected waitRpcRequest<T>(requestToken: string, timeout?: number): Promise<T>;
    /**
     * @summary Sends a request to the Grindery Walletconnect RPC API.
     * @public
     * @param {RpcMethodNames} method Request method name
     * @param {RequestArgumentsParams} params Request parameters
     * @returns {T} The result of the request
     */
    sendRpcApiRequest<T>(method: RpcMethodNames, params?: unknown[] | object): Promise<T>;
}
