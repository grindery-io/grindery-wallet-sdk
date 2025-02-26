import { ProviderEventName } from './EventEmitter';
import { Provider } from './Provider';
import { RpcRequestResults } from './Rpc';
import { User } from '../utils/user';
import { TelegramLoginInfo } from '../utils/telegram';
export type WalletSDKConfig = {
    /**
     * @summary The application ID, obtained in the Grindery bot by the dApp developer.
     */
    appId: string;
    /**
     * @summary The application URL. If not provided, the current page URL will be used.
     */
    appUrl: string;
    /**
     * @summary The pairing API URL. If not provided, the default Grindery API URL will be used.
     */
    pairingApiUrl?: string;
    /**
     * @summary The wallet API URL. If not provided, the default Grindery API URL will be used.
     */
    walletApiUrl?: string;
    /**
     * @summary The redirect mode for the pairing request.
     * @example 'tg' | 'url' | 'close'
     */
    redirectMode?: string;
    /**
     * @summary The default chain ID in CAIP-2 format.
     */
    chainId?: string;
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
    config: WalletSDKConfig;
    constructor(config?: Partial<WalletSDKConfig>);
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
     * @summary Exchange user ID to wallet address
     * @public
     * @since 0.4.0
     * @param {string} userId User ID
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
     * @summary Gets the Grindery user information
     * @public
     * @since 0.5.0
     * @returns {Promise<User>} The Grindery user information
     */
    getUser(): Promise<User>;
    /**
     * @summary Sets the application ID
     * @public
     * @since 0.5.1
     * @param {string} appId The application ID
     * @returns {void}
     */
    setAppId(appId: string): void;
    /**
     * @summary Sets the SDK config
     * @public
     * @since 0.5.1
     * @param {object} config The partial SDK config object
     * @returns {void}
     */
    setConfig(config: Partial<WalletSDKConfig>): void;
    /**
     * @summary Requests pairing by telegram login info
     * @public
     * @since 0.7.0
     * @param {string} appSecret The application secret. Obtained in the Grindery bot by the dApp developer. Required. Must be kept secret.
     * @param {TelegramLoginInfo} telegramLoginInfo The user's Telegram login info. Required.
     * @param {string} [clientId] The client ID. Optional. Unique identifier of the client device.
     */
    requestPairingByTelegramLogin(appSecret: string, telegramLoginInfo: TelegramLoginInfo, clientId?: string): Promise<void>;
    /**
     * @summary Sends a request to the Grindery Wallet JSON-RPC API
     * @public
     * @since 0.7.0
     * @param {string} method Wallet API method name
     * @param {object} params Wallet API method params
     * @returns {T} The result field of the JSON-RPC API request
     */
    sendWalletApiRequest<T>(method: string, params?: object): Promise<T>;
    /**
     * @summary SdkStorage class instance
     * @private
     */
    private storage;
    /**
     * @summary The Grindery Wallet user
     * @private
     */
    private user;
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
    private detectPairingToken;
}
