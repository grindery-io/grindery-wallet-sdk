import { ProviderEventName, ProviderEvents } from './EventEmitter';
import { Provider, ProviderMethodNames } from './Provider';
import { RpcRequestResults } from './Rpc';
import { Storage, StorageKeys } from './Storage';

export type WalletSDKConfig = {
  appId?: string;
};

/**
 * @summary The Wallet SDK class
 * @since 0.2.0
 */
export class WalletSDK {
  /**
   * @summary The provider instance
   * @public
   */
  public provider: Provider;

  constructor(config?: WalletSDKConfig) {
    if (config?.appId) {
      window.Grindery = {
        ...(window.Grindery || {}),
        appId: config?.appId,
      };
    }
    this.provider = this.getWeb3Provider();
    this.provider.on(ProviderEvents.pair, this.handlePairing);
  }

  /**
   * @summary Checks if the provider is connected to the server
   * @returns {boolean} True if the provider is connected to the server.
   *
   * @example
   * ```typescript
   * const isConnected = window.Grindery.WalletSDK.isConnected();
   * ```
   */
  public isConnected(): boolean {
    return this.provider.isConnected();
  }

  /**
   * @summary Checks if the provider is connected to the server and the Grindery Wallet
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */
  public isWalletConnected(): boolean {
    return (
      this.isConnected() &&
      !!this.storage.getValue(StorageKeys.pairingToken) &&
      !this.storage.getValue(StorageKeys.sessionId)
    );
  }

  /**
   * @summary Initiate connection to the Grindery Wallet
   * @public
   * @returns {Promise<string[]>} The array of ethereum addresses
   * @since 0.1.0
   */
  public async connect(): Promise<string[]> {
    return await this.provider.request({
      method: ProviderMethodNames.eth_requestAccounts,
    });
  }

  /**
   * @summary Disconnects Grindery Wallet
   * @public
   * @returns {Promise<boolean>} True if wallet is disconnected
   * @since 0.1.0
   */
  public async disconnect(): Promise<boolean> {
    return await this.provider.request({
      method: ProviderMethodNames.gws_disconnect,
    });
  }

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
  public async sendTransaction(params: {
    to: string;
    value?: string;
    data?: string;
  }): Promise<string> {
    return await this.provider.request<string>({
      method: ProviderMethodNames.eth_sendTransaction,
      params: [params],
    });
  }

  /**
   * @summary Sends a personal signature request to the Grindery Wallet
   * @public
   * @since 0.1.0
   * @param {string} message The message to sign
   * @returns {Promise<string>} Signature string
   */
  public async signMessage(message: string): Promise<string> {
    return await this.provider.request<string>({
      method: ProviderMethodNames.personal_sign,
      params: [message, this.storage.getValue('address')],
    });
  }

  /**
   * @summary Adds a listener to the event
   * @public
   * @param {ProviderEventName} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  public on(event: ProviderEventName, callback: Function) {
    this.provider.on(event, callback);
    return this;
  }

  /**
   * @summary Removes a listener from the event
   * @public
   * @param {ProviderEventName} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  public removeListener(event: ProviderEventName, callback: Function) {
    this.provider.removeListener(event, callback);
    return this;
  }

  /**
   * @summary Storage class instance
   * @private
   */
  private storage: Storage = new Storage();

  /**
   * @summary Gets the Grindery Wallet ethereum provider
   * @returns {Provider} The Grindery Wallet ethereum provider
   */
  private getWeb3Provider(): Provider {
    let provider = window.ethereum?.providers?.find(
      (provider: Provider | unknown) =>
        provider instanceof Provider && provider.isGrinderyWallet
    );
    if (
      !provider &&
      window.ethereum instanceof Provider &&
      window.ethereum.isGrinderyWallet
    ) {
      provider = window.ethereum;
    }
    if (!provider) {
      provider = new Provider();
    }
    return provider;
  }

  /**
   * @summary Handles the pairing request, by opening the Grindery Wallet
   * @private
   * @param ProviderRequestPairingResult
   * @returns {void}
   */
  private handlePairing({
    shortToken,
    connectUrlBrowser,
  }: RpcRequestResults.requestPairing): void {
    const WebApp = window.Telegram?.WebApp;
    const redirectUrl = `https://walletconnect.grindery.com/connect/wc?uri=${shortToken}`;
    if (
      WebApp &&
      WebApp.openTelegramLink &&
      WebApp.platform &&
      WebApp.platform !== 'unknown'
    ) {
      WebApp.openTelegramLink(connectUrlBrowser);
      if (WebApp.close) {
        window.Telegram.WebApp.close();
      }
    } else {
      window.open(redirectUrl, '_blank');
    }
  }
}
