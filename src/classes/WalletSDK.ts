import { ProviderEventName, ProviderEvents } from './EventEmitter';
import { Provider, ProviderMethodNames } from './Provider';
import { Rpc, RpcMethodNames, RpcRequestResults } from './Rpc';
import { SdkStorage, SdkStorageKeys } from './SdkStorage';
import { CHAINS, hexChainId } from '../utils/chains';
import { ClientEventName, ClientEventNames } from '../utils/clientEvents';
import { User } from '../utils/user';
import { WalletAPI } from './WalletAPI';
import { getConfigFromDataAttributes } from '../utils/getConfigFromDataAttributes';

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

  public config: WalletSDKConfig = {
    appId: window.Grindery?.appId || '',
    appUrl: window.Grindery?.appUrl || window.location.origin,
    redirectMode: window.Grindery?.redirectMode,
    pairingApiUrl: window.Grindery?.pairingApiUrl,
    walletApiUrl: window.Grindery?.walletApiUrl,
  };

  constructor(config?: Partial<WalletSDKConfig>) {
    this.config = {
      ...this.config,
      ...(config || getConfigFromDataAttributes() || {}),
    };

    if (!this.config.appId) {
      throw new Error('App ID is required');
    }
    if (!this.config.appUrl) {
      throw new Error('App URL is required');
    }

    window.Grindery = {
      ...window.Grindery,
      ...this.config,
    };

    this.storage.setValue(
      SdkStorageKeys.chainId,
      this.storage.getValue(SdkStorageKeys.chainId) || CHAINS[0]
    );
    this.provider = this.getWeb3Provider();
    setTimeout(() => {
      this.initTracking();
      this.provider.on(ProviderEvents.pair, this.handlePairing);
    }, 500);
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
      !!this.storage.getValue(SdkStorageKeys.pairingToken) &&
      !this.storage.getValue(SdkStorageKeys.sessionId)
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
   * @summary Requests the Grindery Wallet to switch the chain
   * @public
   * @since 0.3.0
   * @param {string} chainId Chain id in CAIP-2 format
   * @returns {Promise<null>} Returns `null` on success
   */
  public async switchChain(chainId: string): Promise<null> {
    return await this.provider.request<null>({
      method: ProviderMethodNames.wallet_switchEthereumChain,
      params: { chainId: hexChainId(chainId) },
    });
  }

  /**
   * @summary Gets currently connected chain
   * @public
   * @since 0.3.0
   * @returns {string} Returns chain id in CAIP-2 format
   */
  public getChain(): string {
    return this.storage.getValue(SdkStorageKeys.chainId) || CHAINS[0];
  }

  /**
   * @summary Exchange Telegram user ID to Grindery Wallet address
   * @public
   * @since 0.4.0
   * @param {string} userId Telegram user ID
   * @returns {Promise<string>} Grindery Wallet address
   */
  public async getUserWalletAddress(
    userId: string
  ): Promise<RpcRequestResults.getUserWalletAddress> {
    const rpc = new Rpc(this.config);
    this.trackClientEvent(ClientEventNames.walletAddressRequested, { userId });
    return await rpc.sendRpcApiRequest<RpcRequestResults.getUserWalletAddress>(
      RpcMethodNames.getUserWalletAddress,
      { appId: this.config.appId, userId }
    );
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
   * @summary Gets the Grindery user information
   * @public
   * @since 0.5.0
   * @returns {Promise<User>} The Grindery user information
   */
  public async getUser(): Promise<User> {
    if (!this.user) {
      const api = new WalletAPI();
      try {
        this.user = await api.sendApiRequest<User>('gw_getMe');
      } catch (e) {
        throw new Error(
          e instanceof Error ? e.message : 'Failed to fetch user information'
        );
      }
    }
    return this.user;
  }

  /**
   * @summary Sets the application ID
   * @public
   * @since 0.5.1
   * @param {string} appId The application ID
   * @returns {void}
   */
  public setAppId(appId: string): void {
    this.config.appId = appId;
    window.Grindery = {
      ...window.Grindery,
      appId,
    };
  }

  /**
   * @summary Sets the SDK config
   * @public
   * @since 0.5.1
   * @param {object} config The partial SDK config object
   * @returns {void}
   */
  public setConfig(config: Partial<WalletSDKConfig>): void {
    this.config = { ...this.config, ...config };
    window.Grindery = {
      ...window.Grindery,
      ...this.config,
    };
  }

  /**
   * @summary SdkStorage class instance
   * @private
   */
  private storage: SdkStorage = new SdkStorage();

  /**
   * @summary The Grindery Wallet user
   * @private
   */
  private user: User | null = null;

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
      provider = new Provider(this.config);
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
    connectUrl,
    connectUrlBrowser,
    miniAppPairingToken,
  }: RpcRequestResults.requestPairing): void {
    const WebApp = window.Telegram?.WebApp;
    const redirectUrl =
      connectUrlBrowser ||
      `https://www.grindery.com/connect/wc?uri=${shortToken}`;
    const miniAppUrl = `https://t.me/GrinderyConnectTestBot/confirm?startapp=${miniAppPairingToken?.replaceAll(
      '.',
      '___'
    )}`;
    if (
      miniAppPairingToken &&
      this.config &&
      this.config.redirectMode &&
      this.config.redirectMode === 'tg'
    ) {
      try {
        window.Telegram?.WebApp?.openTelegramLink?.(miniAppUrl);
      } catch (e) {
        window.open(miniAppUrl, '_blank');
      }
      return;
    }
    if (
      WebApp &&
      WebApp.openTelegramLink &&
      WebApp.platform &&
      WebApp.platform !== 'unknown' &&
      connectUrl
    ) {
      WebApp.openTelegramLink(connectUrl);
    } else {
      window.open(redirectUrl, '_blank');
    }
  }

  /**
   * @summary Tracks client side event
   * @since 0.4.2
   * @private
   * @param AppEvent
   * @returns {Promise<void>}
   */
  private async trackClientEvent(
    name: ClientEventName,
    data?: Record<string, unknown>
  ): Promise<void> {
    const appUrl = this.config.appUrl;
    const appId = this.config.appId;
    const userTelegramId = String(
      window.Telegram?.WebApp?.initDataUnsafe?.user?.id || ''
    );

    try {
      const rpc = new Rpc(this.config);
      await rpc.sendRpcApiRequest<RpcRequestResults.trackClientEvent>(
        RpcMethodNames.trackClientEvent,
        {
          name,
          appUrl,
          userTelegramId,
          data: {
            ...(data || {}),
            pageUrl: window.location.href,
            appId,
            sessionId: this.storage.getValue(SdkStorageKeys.sessionId),
            clientId: this.storage.getValue(SdkStorageKeys.clientId),
            isMiniApp: Boolean(window.Telegram?.initDataUnsafe),
            miniAppPlatform: window.Telegram?.WebApp?.platform,
            miniAppSdkVersion: window.Telegram?.WebApp?.version,
            userAgent: window.navigator.userAgent,
          },
        }
      );
    } catch (e) {
      // ignore
    }
  }

  /**
   * @summary Initializes the tracking
   * @since 0.4.2
   * @private
   * @returns {void}
   */
  private initTracking(): void {
    const onWalletConnect = (wallets: string[]) => {
      if (wallets.length > 0) {
        this.trackClientEvent(ClientEventNames.walletConnected, {
          wallets: wallets,
        });
      }
    };

    const onWalletDisconnect = () => {
      this.trackClientEvent(ClientEventNames.walletDisconnected);
    };

    this.on(ProviderEvents.accountsChanged, onWalletConnect);
    this.on(ProviderEvents.disconnect, onWalletDisconnect);
  }
}
