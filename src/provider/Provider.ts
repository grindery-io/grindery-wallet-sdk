import { ProviderError } from './ProviderError';
import { ProviderLocalStorage } from './ProviderLocalStorage';
import {
  GrinderyRpcMethodName,
  GrinderyRpcProviderRequestMethodName,
  ProviderMethods,
  ProviderRequestResult,
  RequestArguments,
  RequestArgumentsParams,
} from './types';

export class Provider extends ProviderLocalStorage {
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

      return (await this.methods[method].execute(params)) as T;
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }

  /**
   * @summary The application ID.
   */
  protected appId: string = window.location.href;

  /**
   * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
   */
  protected chainId: string = 'eip155:137';

  /**
   * @summary The list of supported provider methods.
   */
  protected methods: ProviderMethods = {};

  protected registerProviderMethods(methods: ProviderMethods): void {
    this.methods = methods;
  }

  protected async sendGrinderyRpcProviderRequest(
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

  protected async waitGrinderyRpcProviderRequest<T>(
    requestToken: string,
    timeout?: number
  ): Promise<T> {
    if (!this.getStorageValue('sessionId')) {
      throw new ProviderError('Unauthorized', 4900);
    }
    try {
      return await this.sendGrinderyRpcApiRequest<T>(
        'checkout_waitForRequestResult',
        {
          requestToken,
          timeout,
        }
      );
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }

  protected async sendGrinderyRpcApiRequest<T>(
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

  protected createProviderRpcError(error: unknown): ProviderError {
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
