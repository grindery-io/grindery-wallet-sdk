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

/**
 * @summary The provider class
 * @since 0.1.0
 * @extends ProviderLocalStorage
 */
export class Provider extends ProviderLocalStorage {
  constructor() {
    super();

    this.injectProvider();

    window.addEventListener('load', () => {
      this.emit('connect', { chainId: this.getChain() });
      this.restoreSession();
    });
  }

  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server.
   */
  public isConnected(): boolean {
    return !!this.chainId;
  }

  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet.
   */
  public isWalletConnected(): boolean {
    return this.isConnected() && !!this.getStorageValue('sessionId');
  }

  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
   */
  public isWalletConnectionPending(): boolean {
    return this.isConnected() && !!this.getStorageValue('pairingToken');
  }

  /**
   * @summary Gets the connected chain ID in hex format
   * @public
   * @returns {string} The chain ID in hex format
   */
  public getChain(): string {
    return `0x${parseFloat(this.chainId.split(':')[1]).toString(16)}`;
  }

  /**
   * @summary Gets the connected user's wallet address
   * @public
   * @returns {string} The ethereum wallet address
   */
  public getAddress(): string {
    return this.accounts[0]?.split(':')[2] || '';
  }

  /**
   * @summary Sends a request to the provider
   * @public
   * @param {RequestArguments} args Request arguments
   * @param {string} args.method The method name
   * @param {RequestArgumentsParams} args.params The method parameters
   * @returns {T} The result of the request
   */
  public async request<T>({ method, params }: RequestArguments): Promise<T> {
    if (!this.chainId) {
      this.emit('disconnect', new ProviderError('Disconnected', 4900));
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
   * @protected
   */
  protected appId: string = window.location.href;

  /**
   * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
   * @protected
   */
  protected chainId: string = 'eip155:137';

  /**
   * @summary The list of supported provider methods.
   * @protected
   */
  protected methods: ProviderMethods = {};

  /**
   * @summary The user's wallet addresses list.
   * @protected
   */
  protected accounts: string[] = [];

  /**
   * @summary Registers the provider methods.
   * @protected
   * @param {ProviderMethods} methods A map of supported provider methods.
   * @returns {void}
   */
  protected registerProviderMethods(methods: ProviderMethods): void {
    this.methods = methods;
  }

  /**
   * @summary Sends a provider request to the Grindery RPC API and waits for the result.
   * @protected
   * @param {GrinderyRpcProviderRequestMethodName} method Provider request method name
   * @param {Array} params Provider request parameters
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  protected async sendAndWaitGrinderyRpcProviderRequest<T>(
    method: GrinderyRpcProviderRequestMethodName,
    params?: readonly unknown[],
    timeout?: number
  ): Promise<T> {
    const request = await this.sendGrinderyRpcProviderRequest(method, params);
    return this.waitGrinderyRpcProviderRequest(request.requestToken, timeout);
  }

  /**
   * @summary Sends a provider request to the Grindery RPC API.
   * @protected
   * @param {GrinderyRpcProviderRequestMethodName} method Provider request method name
   * @param {Array} params Provider request parameters
   * @returns {ProviderRequestResult} The request token to use in the `waitGrinderyRpcProviderRequest` method
   */
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

  /**
   * @summary Waits for the result of the provider request.
   * @protected
   * @param {string} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
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

  /**
   * @summary Sends a request to the Grindery Walletconnect RPC API.
   * @protected
   * @param {GrinderyRpcMethodName} method Request method name
   * @param {RequestArgumentsParams} params Request parameters
   * @returns {T} The result of the request
   */
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

  /**
   * @summary Creates a provider error from an unknown error
   * @protected
   * @param {unknown} error Optional. Error object.
   * @returns {ProviderError} The provider error
   */
  protected createProviderRpcError(error?: unknown): ProviderError {
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

  /**
   * @summary Restores the session if session Id is stored in the local storage
   * @private
   * @returns {void}
   */
  private async restoreSession(): Promise<void> {
    const sessionId = this.getStorageValue('sessionId');
    if (sessionId) {
      try {
        await this.request<string[]>({
          method: 'eth_requestAccounts',
        });
      } catch (error) {
        this.accounts = [];
        this.clearStorage();
      }
    }
  }

  /**
   * @summary Injects the provider into the window object
   * @private
   * @returns {void}
   */
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
  }
}
