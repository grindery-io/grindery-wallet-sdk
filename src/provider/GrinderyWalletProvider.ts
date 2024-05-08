import { ProviderError } from './ProviderError';
import { ProviderLocalStorage } from './ProviderLocalStorage';
import {
  GrinderyRpcMethodName,
  GrinderyRpcProviderRequestMethodName,
  ProviderInterface,
  ProviderMethods,
  ProviderPairingResult,
  ProviderRequestPairingResult,
  ProviderRequestResult,
  RequestArguments,
  RequestArgumentsParams,
} from './types';

/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends ProviderLocalStorage
 * @implements ProviderInterface
 */
export class GrinderyWalletProvider extends ProviderLocalStorage
  implements ProviderInterface {
  /**
   * @summary Indicates that the provider is a Grindery Wallet.
   */
  public readonly isGrinderyWallet: boolean = true;

  constructor() {
    super();
    this.injectProvider();
  }

  /**
   * @returns {boolean} True if the provider is connected to the server.
   */
  public isConnected(): boolean {
    return !!this.chainId;
  }

  /**
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */
  public isWalletConnected(): boolean {
    return this.isConnected() && !!this.getStorageValue('sessionId');
  }

  /**
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
   */
  public isWalletConnectionPending(): boolean {
    return this.isConnected() && !!this.getStorageValue('pairingToken');
  }

  public async request<T>({ method, params }: RequestArguments): Promise<T> {
    if (method !== 'wallet_ping' && !this.chainId) {
      throw new ProviderError('Disconnected', 4900);
    }
    if (!this.methods[method]) {
      throw new ProviderError('Unsupported Method', 4200);
    }

    try {
      if (this.methods[method].sessionRequired && !this.isWalletConnected()) {
        throw new ProviderError('Unauthorized', 4900);
      }
      if (
        this.methods[method].pairingTokenRequired &&
        !this.isWalletConnectionPending()
      ) {
        throw new ProviderError('Unauthorized', 4900);
      }
      return (await this.methods[method].execute(params)) as T;
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }

  /**
   * @summary The application ID.
   */
  private appId: string = window.location.origin || 'localhost';

  /**
   * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
   */
  private chainId: string = 'eip155:137';

  /**
   * @summary The list of supported provider methods.
   */
  private methods: ProviderMethods = {
    /**
     * @summary Connect a dApp to the Grindery Wallet.
     * @since 0.1.0
     * @returns {Promise<string[]>} The list of user wallets' addresses.
     */
    eth_requestAccounts: {
      sessionRequired: false,
      pairingTokenRequired: false,
      execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
        if (this.isWalletConnected()) {
          try {
            return await this.request<string[]>({
              method: 'eth_accounts',
              params: params || [],
            });
          } catch (error) {
            this.setStorageValue('sessionId', '');
            // skip failed request and continue with pairing
          }
        }
        if (this.isWalletConnectionPending()) {
          try {
            this.emit('restorePairing', {
              connectUrl: this.getStorageValue('connectUrl'),
              connectUrlBrowser: this.getStorageValue('connectUrlBrowser'),
            });

            const pairResult = await this.request<ProviderPairingResult>({
              method: 'checkout_waitForPairingResult',
              params: { pairingToken: this.getStorageValue('pairingToken') },
            });

            this.setStorageValue('sessionId', pairResult.sessionId);
            this.setStorageValue('pairingToken', '');
            this.setStorageValue('connectUrl', '');
            this.setStorageValue('connectUrlBrowser', '');

            if (!pairResult.sessionId) {
              throw new ProviderError('Pairing failed', 4900);
            }

            return [];
          } catch (error) {
            this.setStorageValue('sessionId', '');
            this.setStorageValue('pairingToken', '');
            this.setStorageValue('connectUrl', '');
            this.setStorageValue('connectUrlBrowser', '');
            // skip failed request and continue with pairing
          }
        }
        try {
          const result = await this.request<ProviderRequestPairingResult>({
            method: 'checkout_requestPairing',
            params: { appId: this.appId },
          });

          if (!result.pairingToken || !result.connectUrl) {
            throw new ProviderError('Pairing failed', 4900);
          }

          this.setStorageValue('pairingToken', result.pairingToken);
          this.setStorageValue('connectUrl', result.connectUrl);
          this.setStorageValue('connectUrlBrowser', result.connectUrlBrowser);
          this.emit('pairing', {
            connectUrl: result.connectUrl,
            connectUrlBrowser: result.connectUrlBrowser,
          });
          const pairResult = await this.request<ProviderPairingResult>({
            method: 'checkout_waitForPairingResult',
            params: { pairingToken: result.pairingToken },
          });

          this.setStorageValue('sessionId', pairResult.sessionId);

          if (!pairResult.sessionId) {
            throw new ProviderError('Pairing failed', 4900);
          }
          return await this.sendGrinderyRpcApiRequest<string[]>(
            'checkout_request',
            {
              sessionId: pairResult.sessionId,
              scope: this.chainId,
              request: {
                method: 'eth_accounts',
                params: [],
              },
            }
          );
        } catch (error) {
          throw this.createProviderRpcError(error);
        }
      },
    },

    /**
     * @summary Request pairing with the wallet.
     * @since 0.1.0
     * @param {string} appId Required. The application ID.
     * @returns {Promise<ProviderRequestPairingResult>} The pairing request result.
     */
    checkout_requestPairing: {
      sessionRequired: false,
      pairingTokenRequired: false,
      execute: async (
        params?: RequestArgumentsParams
      ): Promise<ProviderRequestPairingResult> => {
        return await this.sendGrinderyRpcApiRequest<
          ProviderRequestPairingResult
        >('checkout_requestPairing', params);
      },
    },

    /**
     * @summary Wait for pairing requst to be approved by user and get the result.
     * @since 0.1.0
     * @param {string} pairingToken Required. The pairing token.
     * @param {number} timeout Optional. Result polling timeout.
     * @returns {Promise<ProviderPairingResult>} - The pairing result.
     */
    checkout_waitForPairingResult: {
      sessionRequired: false,
      pairingTokenRequired: true,
      execute: async (
        params?: RequestArgumentsParams
      ): Promise<ProviderRequestPairingResult> => {
        return await this.sendGrinderyRpcApiRequest<
          ProviderRequestPairingResult
        >('checkout_waitForPairingResult', params);
      },
    },
    eth_accounts: {
      sessionRequired: true,
      pairingTokenRequired: false,
      execute: async (
        params?: RequestArgumentsParams
      ): Promise<ProviderRequestResult> => {
        return await this.sendGrinderyRpcProviderRequest(
          'eth_accounts',
          params ? (Array.isArray(params) ? params : [params]) : []
        );
      },
    },
    eth_sendTransaction: {
      sessionRequired: true,
      pairingTokenRequired: false,
      execute: async (
        params?: RequestArgumentsParams
      ): Promise<ProviderRequestResult> => {
        if (!this.isWalletConnected()) {
          throw new ProviderError('Unauthorized', 4900);
        }
        return await this.sendGrinderyRpcProviderRequest(
          'eth_sendTransaction',
          params ? (Array.isArray(params) ? params : [params]) : []
        );
      },
    },
    personal_sign: {
      sessionRequired: true,
      pairingTokenRequired: false,
      execute: async (
        params?: Partial<RequestArgumentsParams>
      ): Promise<{ requestToken: string }> => {
        if (!this.isWalletConnected()) {
          throw new ProviderError('Unauthorized', 4900);
        }
        return await this.sendGrinderyRpcProviderRequest(
          'personal_sign',
          params ? (Array.isArray(params) ? params : [params]) : []
        );
      },
    },
  };

  private async sendGrinderyRpcProviderRequest(
    method: GrinderyRpcProviderRequestMethodName,
    params?: readonly unknown[]
  ): Promise<ProviderRequestResult> {
    if (!this.getStorageValue('sessionId')) {
      throw new ProviderError('Unauthorized', 4900);
    }
    try {
      return await this.sendGrinderyRpcApiRequest<ProviderRequestResult>(
        'checkout_request',
        {
          sessionId: this.getStorageValue('sessionId'),
          scope: this.chainId,
          request: {
            method,
            params,
          },
        }
      );
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }

  // waitForRequestResult

  private async sendGrinderyRpcApiRequest<T>(
    method: GrinderyRpcMethodName,
    params?: RequestArgumentsParams
  ): Promise<T> {
    try {
      const response = await fetch('https://walletconnect-api.grindery.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params: params || [],
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new ProviderError(data.error.message, data.error.code);
      }
      if (!data.result) {
        throw new ProviderError('No result', 4900);
      }
      return data.result;
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }

  private createProviderRpcError(error: unknown): ProviderError {
    let errorResponse: ProviderError;
    if (error instanceof ProviderError) {
      errorResponse = new ProviderError(error.message || 'Unknown error');
      errorResponse.code = error.code || 4900;
      errorResponse.data = error.data;
    } else if (error instanceof Error) {
      errorResponse = new ProviderError(error.message || 'Unknown error');
      errorResponse.code = 4900;
    } else {
      errorResponse = new ProviderError('Unknown error');
      errorResponse.code = 4900;
    }
    return errorResponse;
  }

  private injectProvider(): void {
    if (!window.ethereum) {
      window.ethereum = this;
    } else {
      if (
        window.ethereum.providers &&
        Array.isArray(window.ethereum.providers)
      ) {
        window.ethereum.providers.push(this);
      } else {
        window.ethereum.providers = [window.ethereum, this];
      }
    }

    addEventListener('load', () => {
      this.emit('connect', { chainId: this.chainId });
    });
  }
}
