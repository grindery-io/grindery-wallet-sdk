import { providerInfo } from '../utils/providerInfo';
import { EventEmitter, ProviderEvents } from './EventEmitter';
import { ProviderErrors, newProviderError } from './ProviderError';
import { Rpc, RpcMethodNames, RpcRequestResults } from './Rpc';
import { SdkStorage, SdkStorageKeys } from './SdkStorage';
import { CHAINS, hexChainId, unhexChainId } from '../utils/chains';
import { WalletSDKConfig } from './WalletSDK';

/**
 * @summary The Grindery wallet provider methods
 * @since 0.2.0
 */
export type ProviderMethods = {
  [name in ProviderMethodNames]: (
    params?: ProviderRequestArgumentsParams
  ) => Promise<unknown>;
};

/**
 * @summary The Grindery wallet provider method names
 * @since 0.2.0
 * @since 0.3.0 Added `eth_chainId`, `wallet_addEthereumChain` and `wallet_switchEthereumChain` methods
 */
export enum ProviderMethodNames {
  eth_requestAccounts = 'eth_requestAccounts',
  eth_accounts = 'eth_accounts',
  personal_sign = 'personal_sign',
  eth_sendTransaction = 'eth_sendTransaction',
  gws_disconnect = 'gws_disconnect',
  eth_chainId = 'eth_chainId',
  wallet_addEthereumChain = 'wallet_addEthereumChain',
  wallet_switchEthereumChain = 'wallet_switchEthereumChain',
}

export namespace ProviderRequestResults {
  export type eth_accounts = string[];
  export type eth_requestAccounts = string[];
  export type personal_sign = string;
  export type eth_sendTransaction = string;
  export type disconnect = boolean;
  export type wallet_switchEthereumChain = null;
  export type wallet_addEthereumChain = null;
  export type eth_chainId = string;
}

/**
 * @summary The Grindery wallet provider method names
 * @since 0.2.0
 */
export type ProviderMethodName = keyof typeof ProviderMethodNames;

/**
 * @summary The Grindery wallet provider request params
 * @since 0.2.0
 */
export type ProviderRequestArgumentsParams = readonly unknown[] | object;

/**
 * @summary The Grindery wallet provider request arguments
 * @since 0.2.0
 */
export interface ProviderRequestArguments {
  readonly method: ProviderMethodName;
  readonly params?: ProviderRequestArgumentsParams;
}

/**
 * @summary The base wallet provider class
 * @since 0.2.0
 * @extends EventEmitter
 */
export class Provider extends EventEmitter {
  public isGrinderyWallet: boolean = true;
  private config: WalletSDKConfig;

  constructor(config: WalletSDKConfig) {
    super();
    this.config = config;
    this.rpc = new Rpc(this.config);
    if (this.config?.appId) {
      this.injectProvider();
      this.listenForRequestProviderEvents();
      this.announceProvider();
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.restoreConnection();
      });
    }
  }

  public restoreConnection(): void {
    if (this.config?.appId) {
      this.emit(ProviderEvents.connect, {
        chainId: hexChainId(
          this.storage.getValue(SdkStorageKeys.chainId) ||
            this.config?.chainId ||
            CHAINS[0]
        ),
      });
      this.restorePairing();
      this.restoreSession();
    }
  }

  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server.
   */
  public isConnected(): boolean {
    // Always true
    return true;
  }

  /**
   * @summary Sends a request to the provider
   * @public
   * @param {ProviderRequestArguments} args Request arguments
   * @param {string} args.method The method name
   * @param {ProviderRequestArgumentsParams} args.params The method parameters
   * @returns {T} The result of the request
   */
  public async request<T>({
    method,
    params,
  }: ProviderRequestArguments): Promise<T> {
    return (await this.methods[method]?.(params)) as T;
  }

  /**
   * @summary Sends a request to the provider (legacy)
   * @public
   * @param {ProviderRequestArguments} args Request arguments
   * @param {string} args.method The method name
   * @param {ProviderRequestArgumentsParams} args.params The method parameters
   * @param {Function} callback The callback function
   * @deprecated Use `request` method instead
   * @since 0.5.4
   * @returns {void} `void`
   */
  public sendAsync(
    { method, params }: ProviderRequestArguments,
    callback: Function
  ): void {
    this.methods[method]?.(params)
      .then((res) => {
        callback(null, res);
      })
      .catch((error) => {
        callback(error);
      });
  }

  private storage: SdkStorage = new SdkStorage();

  private rpc: Rpc;

  /**
   * @summary Switches the chain
   * @since 0.3.0
   * @param {string} chainId Chain id in hex format
   * @returns {null} `Null` on success
   */
  private switchChain = async ({ chainId }: any): Promise<null> => {
    const chainCaip = unhexChainId(chainId);
    if (!CHAINS.includes(chainCaip)) {
      throw newProviderError(ProviderErrors.ChainDisconnected);
    }
    this.storage.setValue(SdkStorageKeys.chainId, chainCaip);
    this.emit(ProviderEvents.chainChanged, { chainId });
    return null;
  };

  /**
   * @summary The list of supported provider methods.
   * @private
   */
  private methods: Partial<ProviderMethods> = {
    /**
     * @summary The `eth_requestAccounts` provider method
     */
    [ProviderMethodNames.eth_requestAccounts]: async (
      params?: ProviderRequestArgumentsParams
    ): Promise<ProviderRequestResults.eth_requestAccounts> => {
      if (!this.config.appId) {
        throw newProviderError(ProviderErrors.NoAppId);
      }
      if (this.storage.getValue('sessionId')) {
        try {
          return await this.request<ProviderRequestResults.eth_accounts>({
            method: ProviderMethodNames.eth_accounts,
            params: [],
          });
        } catch (error) {
          this.storage.setValue(SdkStorageKeys.sessionId, '');
          // skip failed request and continue with pairing
        }
      }
      if (this.storage.getValue('pairingToken')) {
        try {
          const pairResult =
            await this.rpc.sendRpcApiRequest<RpcRequestResults.waitForPairingResult>(
              RpcMethodNames.waitForPairingResult,
              {
                pairingToken: this.storage.getValue(
                  SdkStorageKeys.pairingToken
                ),
              }
            );

          this.storage.clear();
          this.storage.setValue(
            SdkStorageKeys.sessionId,
            pairResult.session.sessionId
          );

          if (!pairResult.session.sessionId) {
            throw ProviderErrors.PairingFailed;
          }

          return await this.request<ProviderRequestResults.eth_accounts>({
            method: ProviderMethodNames.eth_accounts,
            params: params || [],
          });
        } catch (error) {
          this.storage.clear();
          // skip failed request and continue with pairing
        }
      }
      try {
        this.storage.clear();
        const result =
          await this.rpc.sendRpcApiRequest<RpcRequestResults.requestPairing>(
            RpcMethodNames.requestPairing,
            {
              appId: this.config?.appId || '',
              clientId: this.storage.getValue(SdkStorageKeys.clientId),
              redirectMode: this.config?.redirectMode,
              redirectUrl: this.config?.appUrl,
            }
          );

        if (!result.pairingToken || !result.connectUrl) {
          throw ProviderErrors.PairingFailed;
        }

        this.storage.setValue(SdkStorageKeys.pairingToken, result.pairingToken);
        this.storage.setValue(SdkStorageKeys.connectUrl, result.connectUrl);
        this.storage.setValue(
          SdkStorageKeys.connectUrlBrowser,
          result.connectUrlBrowser
        );
        this.storage.setValue(SdkStorageKeys.shortToken, result.shortToken);
        this.emit(ProviderEvents.pair, {
          config: this.config,
          shortToken: result.shortToken,
          connectUrl: result.connectUrl,
          connectUrlBrowser: result.connectUrlBrowser,
          miniAppPairingToken: result.miniAppPairingToken,
        });
        const pairResult =
          await this.rpc.sendRpcApiRequest<RpcRequestResults.waitForPairingResult>(
            RpcMethodNames.waitForPairingResult,
            {
              pairingToken: result.pairingToken,
            }
          );

        this.storage.setValue(
          SdkStorageKeys.sessionId,
          pairResult.session.sessionId
        );

        if (!pairResult.session.sessionId) {
          throw ProviderErrors.PairingFailed;
        }
        this.storage.setValue(SdkStorageKeys.pairingToken, '');
        this.storage.setValue(SdkStorageKeys.connectUrl, '');
        this.storage.setValue(SdkStorageKeys.connectUrlBrowser, '');
        this.storage.setValue(SdkStorageKeys.shortToken, '');

        return await this.request({
          method: ProviderMethodNames.eth_accounts,
          params: params || [],
        });
      } catch (error) {
        throw error;
      }
    },

    /**
     * @summary The `eth_accounts` provider method
     */
    [ProviderMethodNames.eth_accounts]: async (
      params?: ProviderRequestArgumentsParams
    ): Promise<ProviderRequestResults.eth_accounts> => {
      try {
        const result = (await this.rpc.sendAndWaitRpcRequest<string[]>(
          ProviderMethodNames.eth_accounts,
          params ? (Array.isArray(params) ? params : [params]) : []
        )) as ProviderRequestResults.eth_accounts;
        this.storage.setValue(SdkStorageKeys.address, result[0] || '');
        this.emit(ProviderEvents.accountsChanged, result);
        return result;
      } catch (error) {
        throw newProviderError(error);
      }
    },

    /**
     * @summary The `eth_sendTransaction` provider method
     */
    [ProviderMethodNames.eth_sendTransaction]: async (
      params?: ProviderRequestArgumentsParams
    ): Promise<ProviderRequestResults.eth_sendTransaction> => {
      return (await this.rpc.sendAndWaitRpcRequest(
        ProviderMethodNames.eth_sendTransaction,
        params ? (Array.isArray(params) ? params : [params]) : []
      )) as ProviderRequestResults.eth_sendTransaction;
    },

    /**
     * @summary The `personal_sign` provider method
     */
    [ProviderMethodNames.personal_sign]: async (
      params?: Partial<ProviderRequestArgumentsParams>
    ): Promise<ProviderRequestResults.personal_sign> => {
      return (await this.rpc.sendAndWaitRpcRequest(
        ProviderMethodNames.personal_sign,
        params ? (Array.isArray(params) ? params : [params]) : []
      )) as ProviderRequestResults.personal_sign;
    },

    /**
     * @summary The `gws_disconnect` provider method
     */
    [ProviderMethodNames.gws_disconnect]:
      async (): Promise<ProviderRequestResults.disconnect> => {
        try {
          const result =
            await this.rpc.sendRpcApiRequest<ProviderRequestResults.disconnect>(
              RpcMethodNames.disconnect,
              {
                sessionToken: this.storage.getValue(SdkStorageKeys.sessionId),
              }
            );

          this.emit(ProviderEvents.disconnect, ProviderErrors.Disconnected);

          return result;
        } catch (error) {
          throw newProviderError(error);
        }
      },

    /**
     * @summary The `eth_chainId` provider method
     * @since 0.3.0
     */
    [ProviderMethodNames.eth_chainId]: async (
      _?: ProviderRequestArgumentsParams
    ): Promise<ProviderRequestResults.eth_chainId> => {
      return hexChainId(
        this.storage.getValue(SdkStorageKeys.chainId) ||
          this.config?.chainId ||
          CHAINS[0]
      );
    },

    /**
     * @summary The `wallet_addEthereumChain` provider method
     * @since 0.3.0
     */
    [ProviderMethodNames.wallet_addEthereumChain]: async (
      _?: ProviderRequestArgumentsParams
    ): Promise<ProviderRequestResults.wallet_addEthereumChain> => {
      throw newProviderError(ProviderErrors.UserRejected);
    },

    /**
     * @summary The `wallet_switchEthereumChain` provider method
     * @since 0.3.0
     */
    [ProviderMethodNames.wallet_switchEthereumChain]: async (
      params?: ProviderRequestArgumentsParams
    ): Promise<ProviderRequestResults.wallet_switchEthereumChain> =>
      await this.switchChain(params),
  };

  /**
   * @summary Restores the pairing process if pairing token is stored in the local storage
   * @private
   * @returns {void}
   */
  private async restorePairing(): Promise<void> {
    const pairingToken = this.storage.getValue(SdkStorageKeys.pairingToken);
    const sessionId = this.storage.getValue(SdkStorageKeys.sessionId);
    if (pairingToken && !sessionId) {
      try {
        const pairResult =
          await this.rpc.sendRpcApiRequest<RpcRequestResults.waitForPairingResult>(
            RpcMethodNames.waitForPairingResult,
            {
              pairingToken,
            }
          );

        this.storage.clear();
        this.storage.setValue(
          SdkStorageKeys.sessionId,
          pairResult.session.sessionId
        );

        if (!pairResult.session.sessionId) {
          throw ProviderErrors.PairingFailed;
        }

        const accounts = (
          pairResult.session?.namespaces?.[`eip155`]?.accounts || []
        ).map((account) =>
          account.includes(':') ? account.split(':')[2] || '' : account
        );
        this.storage.setValue(SdkStorageKeys.address, accounts[0] || '');
        this.emit(ProviderEvents.accountsChanged, accounts);
      } catch (error) {
        this.storage.clear();
      }
    }
  }

  /**
   * @summary Restores the session if session Id is stored in the local storage
   * @private
   * @returns {void}
   */
  private async restoreSession(): Promise<void> {
    const pairingToken = this.storage.getValue(SdkStorageKeys.pairingToken);
    const sessionId = this.storage.getValue(SdkStorageKeys.sessionId);
    if (sessionId && !pairingToken) {
      try {
        await this.request<string[]>({
          method: ProviderMethodNames.eth_requestAccounts,
        });
      } catch (error) {
        this.storage.clear();
      }
    }
  }

  /**
   * @summary Injects the provider into the window object
   * @private
   * @returns {void}
   */
  private injectProvider(): void {
    if (typeof window !== 'undefined') {
      if (!window.ethereum) {
        window.ethereum = this;
      } else {
        if (
          window.ethereum.providers &&
          Array.isArray(window.ethereum.providers)
        ) {
          if (
            window.ethereum.providers.filter((p: any) => p.isGrinderyWallet)
              .length > 0
          ) {
            window.ethereum.providers = window.ethereum.providers.map(
              (p: any) => {
                if (p.isGrinderyWallet) {
                  return this;
                }
                return p;
              }
            );
          } else {
            window.ethereum.providers.push(this);
          }
        } else {
          window.ethereum.providers = [window.ethereum, this];
        }
      }
    }
  }

  /**
   * @summary Announces the provider to the window object
   * @private
   * @since 0.1.1
   * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
   * @returns {void}
   */
  private announceProvider(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('eip6963:announceProvider', {
          detail: Object.freeze({ info: providerInfo, provider: this }),
        })
      );
    }
  }

  /**
   * @summary Listens for the request provider events
   * @private
   * @since 0.1.1
   * @link https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events
   * @returns {void}
   */
  private listenForRequestProviderEvents(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('eip6963:requestProvider', () => {
        this.announceProvider();
      });
    }
  }
}
