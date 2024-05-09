import { ProviderEvent } from '../types';
import { GrinderyWalletProvider } from '../provider/GrinderyWalletProvider';
/**
 * @summary The Grindery Wallet SDK class
 * @since 0.1.0
 */
export declare class GrinderyWalletSDK {
    /**
     * @summary The provider instance
     * @public
     */
    provider: GrinderyWalletProvider;
    constructor();
    /**
     * @summary Checks if the provider is connected to the server
     * @returns {boolean} True if the provider is connected to the server.
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
     * @summary Sends a transaction request to the Grindery Wallet
     * @public
     * @since 0.1.0
     * @param {object} params The transaction parameters
     * @param {string} params.to The recipient address
     * @param {string} [params.value] The amount to send in wei
     * @param {string} [params.data] The data to send
     * @returns {Promise<string[]>} Array with transaction hash string
     */
    sendTransaction(params: {
        to: string;
        value?: string;
        data?: string;
    }): Promise<string[]>;
    /**
     * @summary Sends a personal signature request to the Grindery Wallet
     * @public
     * @since 0.1.0
     * @param {string} message The message to sign
     * @returns {Promise<string>} Signature string
     */
    signMessage(message: string): Promise<string>;
    /**
     * @summary Adds a listener to the event
     * @public
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    on(event: ProviderEvent, callback: Function): this;
    /**
     * @summary Removes a listener from the event
     * @public
     * @param {string} event Event name
     * @param {Function} callback Callback function
     * @returns {EventEmitter} The instance of the class itself
     */
    removeListener(event: ProviderEvent, callback: Function): this;
    /**
     * @summary Gets the Grindery Wallet ethereum provider
     * @returns {GrinderyWalletProvider} The Grindery Wallet ethereum provider
     */
    private getWeb3Provider;
    /**
     * @summary Handles the pairing request, by opening the Grindery Wallet
     * @private
     * @param ProviderRequestPairingResult
     * @returns {void}
     */
    private handlePairing;
}
