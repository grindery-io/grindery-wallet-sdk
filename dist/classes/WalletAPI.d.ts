/**
 * @summary The Grindery Wallet API wrapper class
 * @since 0.5.0
 */
export declare class WalletAPI {
    /**
     * @summary Sends a request to the Grindery Wallet API
     * @public
     * @param {string} path API route path
     * @param {string} method Optional. The request method. Default is 'GET'.
     * @param {object} body Optional. The request body.
     * @returns {T} The result of the API request
     */
    sendApiRequest<T>(path: string, method?: string, body?: object): Promise<T>;
}
