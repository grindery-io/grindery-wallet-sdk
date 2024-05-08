import { ProviderError } from './ProviderError';
import { ProviderLocalStorage } from './ProviderLocalStorage';
import {
  GrinderyRpcMethodName,
  ProviderInterface,
  ProviderMethods,
  ProviderPairingResult,
  ProviderRequestPairingResult,
  RequestArguments,
  RequestArgumentsParams,
} from './types';

export class GrinderyWalletProvider extends ProviderLocalStorage
  implements ProviderInterface {
  public readonly isGrinderyWallet: boolean = true;

  constructor() {
    super();
    this.injectProvider();
  }

  public isConnected(): boolean {
    return !!this.chainId;
  }

  public isWalletConnected(): boolean {
    return this.isConnected() && !!this.getStorageValue('sessionId');
  }

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

  private appId: string = window.location.origin || 'localhost';
  private chainId: string = 'eip155:137';

  /* Avaialble provider `request` methods */
  private methods: ProviderMethods = {
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
                params,
              },
            }
          );
        } catch (error) {
          throw this.createProviderRpcError(error);
        }
      },
    },
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
      execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
        return await this.sendGrinderyRpcApiRequest<string[]>(
          'checkout_request',
          {
            sessionId: this.getStorageValue('sessionId'),
            scope: this.chainId,
            request: {
              method: 'eth_accounts',
              params: params || [],
            },
          }
        );
      },
    },
    eth_sendTransaction: {
      sessionRequired: true,
      pairingTokenRequired: false,
      execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
        if (!this.isWalletConnected()) {
          throw new ProviderError('Unauthorized', 4900);
        }
        return await this.sendGrinderyRpcApiRequest<string[]>(
          'checkout_request',
          {
            sessionId: this.getStorageValue('sessionId'),
            scope: this.chainId,
            request: {
              method: 'eth_sendTransaction',
              params: params || [],
            },
          }
        );
      },
    },
    personal_sign: {
      sessionRequired: true,
      pairingTokenRequired: false,
      execute: async (params?: RequestArgumentsParams): Promise<string> => {
        if (!this.isWalletConnected()) {
          throw new ProviderError('Unauthorized', 4900);
        }
        return await this.sendGrinderyRpcApiRequest<string>(
          'checkout_request',
          {
            sessionId: this.getStorageValue('sessionId'),
            scope: this.chainId,
            request: {
              method: 'personal_sign',
              params: params || [],
            },
          }
        );
      },
    },
  };

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
      setTimeout(() => {
        this.emit('connect', { chainId: this.chainId });
      }, 1000);
    });
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
}
