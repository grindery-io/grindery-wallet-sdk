import {
  GrinderyRpcProviderRequestMethodNames,
  ProviderEvents,
} from '../enums';
import {
  GrinderyRpcApiRequestResults,
  GrinderyWalletSDKConfig,
  ProviderEvent,
} from '../types';
import { GrinderyWalletProvider } from '../provider/GrinderyWalletProvider';

/**
 * @summary The Grindery Wallet SDK class
 * @since 0.1.0
 */
export class GrinderyWalletSDK {
  /**
   * @summary The provider instance
   * @public
   */
  public provider: GrinderyWalletProvider;

  constructor({ appId }: GrinderyWalletSDKConfig) {
    this.provider = this.getWeb3Provider();
    this.setAppId(appId);
    this.provider.on(ProviderEvents.pair, this.handlePairing);
  }

  /**
   * @summary Checks if the provider is connected to the server
   * @returns {boolean} True if the provider is connected to the server.
   */
  public isConnected(): boolean {
    return this.provider.isConnected();
  }

  /**
   * @summary Checks if the provider is connected to the server and the Grindery Wallet
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */
  public isWalletConnected(): boolean {
    return this.provider.isWalletConnected();
  }

  /**
   * @summary Initiate connection to the Grindery Wallet
   * @public
   * @returns {Promise<string[]>} The array of ethereum addresses
   * @since 0.1.0
   */
  public async connect(): Promise<string[]> {
    return await this.provider.request({
      method: GrinderyRpcProviderRequestMethodNames.eth_requestAccounts,
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
      method: GrinderyRpcProviderRequestMethodNames.gws_disconnect,
    });
  }

  /**
   * @summary Sets the app id
   * @public
   * @since 0.1.0
   * @param {string} appId The app id
   * @returns {void}
   */
  public setAppId(appId: string): void {
    this.provider.setAppId(appId);
  }

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
  public async sendTransaction(params: {
    to: string;
    value?: string;
    data?: string;
  }): Promise<string[]> {
    return await this.provider.request<string[]>({
      method: GrinderyRpcProviderRequestMethodNames.eth_sendTransaction,
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
      method: GrinderyRpcProviderRequestMethodNames.personal_sign,
      params: [message, this.provider.getAddress()],
    });
  }

  /**
   * @summary Adds a listener to the event
   * @public
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  public on(event: ProviderEvent, callback: Function) {
    this.provider.on(event, callback);
    return this;
  }

  /**
   * @summary Removes a listener from the event
   * @public
   * @param {string} event Event name
   * @param {Function} callback Callback function
   * @returns {EventEmitter} The instance of the class itself
   */
  public removeListener(event: ProviderEvent, callback: Function) {
    this.provider.removeListener(event, callback);
    return this;
  }

  /**
   * @summary Gets the Grindery Wallet ethereum provider
   * @returns {GrinderyWalletProvider} The Grindery Wallet ethereum provider
   */
  private getWeb3Provider(): GrinderyWalletProvider {
    let provider = window.ethereum?.providers?.find(
      (provider: GrinderyWalletProvider | unknown) =>
        provider instanceof GrinderyWalletProvider && provider.isGrinderyWallet
    );
    if (
      !provider &&
      window.ethereum instanceof GrinderyWalletProvider &&
      window.ethereum.isGrinderyWallet
    ) {
      provider = window.ethereum;
    }
    if (!provider) {
      provider = new GrinderyWalletProvider();
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
  }: GrinderyRpcApiRequestResults.requestPairing): void {
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
