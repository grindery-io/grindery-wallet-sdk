/**
 * @summary The Grindery Wallet API wrapper class
 * @since 0.5.0
 */
export declare class WalletAPI {
    /**
     * @summary Sends a request to the Grindery Wallet API
     * @public
     * @param {string} method JSON-RPC method name
     * @param {object} params JSON-RPC method parameters, optional
     * @returns {T} The result of the API request
     */
    sendApiRequest<T>(method: string, params?: object): Promise<T>;
}
