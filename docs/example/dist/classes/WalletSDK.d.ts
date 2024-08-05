import { ProviderEventName } from './EventEmitter';
import { Provider } from './Provider';
import { RpcRequestResults } from './Rpc';
export type WalletSDKConfig = {
    appId?: string;
    appUrl?: string;
};
/**
 * @summary The Wallet SDK class
 * @since 0.2.0
 */
export declare class WalletSDK {
    /**
     * @summary The provider instance
     * @public
     */
    provider: Provider;
    constructor(config?: WalletSDKConfig);
    /**
     * @summary Checks if the provider is connected to the server
     * @returns {boolean} True if the provider is connected to the server.
     *
     * @example
     * ```typescript
     * const isConnected = window.Grindery.WalletSDK.isConnected();
     * ```
     */
    isConnected(): boolean;
    /**
     * @summary Checks if the provider is connected to the server and the Grindery Wallet
     * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
     */
    isWalletConnected(): boolean;
    /**
     * @summary Initiate connection to the Grindery Wallet
     * @public
     * @returns {Promise<string[]>} The array of ethereum addresses
     * @since 0.1.0
     */
    connect(): Promise<string[]>;
    /**
     * @summary Disconnects Grindery Wallet
     * @public
     * @returns {Promise<boolean>} True if wallet is disconnected
     * @since 0.1.0
     */
    disconnect(): Promise<boolean>;
    /**
     * @summary Sends a transaction request to the Grindery Wallet
     * @public
     * @since 0.1.0
     * @param {object} params The transaction parameters
     * @param {string} params.to The recipient address
     * @param {string} [params.value] The amount to send in wei
     * @param {string} [params.data] The data to send
     * @returns {Promise<string>} Transaction hash string
     */
    sendTransaction(params: {
        to: string;
        value?: string;
        data?: string;
    }): Promise<string>;
    /**
     * @summary Sends a personal signature request to the Grindery Wallet
     * @public
     * @since 0.1.0
     * @param {string} message The message to sign
     * @returns {Promise<string>} Signature string
     */
    signMessage(message: string): Promise<string>;
    /**
     * @summary Requests the Grindery Wallet to switch the chain
     * @public
     * @since 0.3.0
     * @param {string} chainId Chain id in CAIP-2 format
     * @returns {Promise<null>} Returns `null` on success
     */
    switchChain(chainId: string): Promise<null>;
    /**
     * @summary Gets currently connected chain
     * @public
     * @since 0.3.0
     * @returns {string} Returns chain id in CAIP-2 format
     */
    getChain(): string;
    /**
     * @summary Exchange Telegram user ID to Grindery Wallet address
     * @public
     * @since 0.4.0
     * @param {string} userId Telegram user ID
     * @returns {Promise<string>} Grindery Wallet address
     */
    getUserWalletAddress(userId: string): Promise<RpcRequestResults.getUserWalletAddress>;
    /**
     * @summary Adds a listener to the event
     * @public
     * @param {ProviderEventName} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    on(event: ProviderEventName, callback: Function): this;
    /**
     * @summary Removes a listener from the event
     * @public
     * @param {ProviderEventName} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    removeListener(event: ProviderEventName, callback: Function): this;
    /**
     * @summary SdkStorage class instance
     * @private
     */
    private storage;
    /**
     * @summary Gets the Grindery Wallet ethereum provider
     * @returns {Provider} The Grindery Wallet ethereum provider
     */
    private getWeb3Provider;
    /**
     * @summary Handles the pairing request, by opening the Grindery Wallet
     * @private
     * @param ProviderRequestPairingResult
     * @returns {void}
     */
    private handlePairing;
    /**
     * @summary Tracks client side event
     * @since 0.4.2
     * @private
     * @param AppEvent
     * @returns {Promise<void>}
     */
    private trackClientEvent;
    /**
     * @summary Initializes the tracking
     * @since 0.4.2
     * @private
     * @returns {void}
     */
    private initTracking;
}
