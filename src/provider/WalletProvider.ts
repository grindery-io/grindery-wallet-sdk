import { WalletProviderLocalStorage } from './WalletProviderLocalStorage';
import {
  Address,
  ChainId,
  GrinderyRpcMethodName,
  GrinderyRpcProviderRequestMethodName,
  ProviderMethods,
  ProviderRequestResult,
  RequestArguments,
  RequestArgumentsParams,
  RequestToken,
} from '../types';
import {
  WalletProviderError,
  WalletProviderErrors,
} from './WalletProviderError';
import {
  GrinderyRpcMethodNames,
  ProviderEvents,
  ProviderStorageKeys,
} from '../enums';

/**
 * @summary The base wallet provider class
 * @since 0.1.0
 * @extends WalletProviderLocalStorage
 */
export class WalletProvider extends WalletProviderLocalStorage {
  constructor() {
    super();

    this.injectProvider();
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
    return (
      this.isConnected() &&
      !!this.getStorageValue(ProviderStorageKeys.sessionId)
    );
  }

  /**
   * @public
   * @returns {boolean} True if the provider is connected to the server and the Grindery Wallet pairing is in progress (pending).
   */
  public isWalletConnectionPending(): boolean {
    return (
      this.isConnected() &&
      !!this.getStorageValue(ProviderStorageKeys.pairingToken)
    );
  }

  /**
   * @summary Gets the connected chain ID in hex format
   * @public
   * @returns {ChainId} The chain ID in hex format
   */
  public getChain(): ChainId {
    return `0x${parseFloat(this.chainId.split(':')[1]).toString(16)}`;
  }

  /**
   * @summary Gets the connected user's wallet address
   * @public
   * @returns {Address} The ethereum wallet address
   */
  public getAddress(): Address {
    return this.accounts[0] || '';
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
      this.emit(ProviderEvents.disconnect, WalletProviderErrors.Disconnected);
      throw WalletProviderErrors.Disconnected;
    }
    if (!this.methods[method]) {
      throw WalletProviderErrors.UnsupportedMethod;
    }

    try {
      if (this.methods[method]?.sessionRequired && !this.isWalletConnected()) {
        throw WalletProviderErrors.Unauthorized;
      }

      return (await this.methods[method]?.execute(params)) as T;
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }

  /**
   * @summary Sends a provider request to the Grindery RPC API and waits for the result.
   * @public
   * @param {GrinderyRpcProviderRequestMethodName} method Provider request method name
   * @param {Array} params Provider request parameters
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  public async sendAndWaitGrinderyRpcProviderRequest<T>(
    method: GrinderyRpcProviderRequestMethodName,
    params?: readonly unknown[],
    timeout?: number
  ): Promise<T> {
    const request = await this.sendGrinderyRpcProviderRequest(method, params);
    return await this.waitGrinderyRpcProviderRequest(
      request.requestToken,
      timeout
    );
  }

  /**
   * @summary The application ID.
   * @protected
   */
  protected appId: string = document.title || 'Grindery Wallet Provider';

  /**
   * @summary The chain ID in CAIP-2 format; e.g. "eip155:1".
   * @protected
   */
  protected chainId: ChainId = 'eip155:137';

  /**
   * @summary The list of supported provider methods.
   * @protected
   */
  protected methods: Partial<ProviderMethods> = {};

  /**
   * @summary The user's wallet addresses list.
   * @protected
   */
  protected accounts: Address[] = [];

  /**
   * @summary Registers the provider methods.
   * @protected
   * @param {ProviderMethods} methods A map of supported provider methods.
   * @returns {void}
   */
  protected registerProviderMethods(methods: Partial<ProviderMethods>): void {
    this.methods = methods;
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
    if (!this.getStorageValue(ProviderStorageKeys.sessionId)) {
      throw WalletProviderErrors.Unauthorized;
    }
    try {
      return await this.sendGrinderyRpcApiRequest<ProviderRequestResult>(
        GrinderyRpcMethodNames.checkout_request,
        {
          sessionId: this.getStorageValue(ProviderStorageKeys.sessionId),
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
   * @param {RequestToken} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  protected async waitGrinderyRpcProviderRequest<T>(
    requestToken: RequestToken,
    timeout?: number
  ): Promise<T> {
    if (!this.getStorageValue(ProviderStorageKeys.sessionId)) {
      throw WalletProviderErrors.Unauthorized;
    }
    try {
      return await this.sendGrinderyRpcApiRequest<T>(
        GrinderyRpcMethodNames.checkout_waitForRequestResult,
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
        throw new WalletProviderError(data.error.message, data.error.code);
      }
      if (!data.result) {
        throw WalletProviderErrors.NoResult;
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
   * @returns {WalletProviderError} The provider error
   */
  protected createProviderRpcError(error?: unknown): WalletProviderError {
    let errorResponse: WalletProviderError;
    if (error instanceof WalletProviderError) {
      errorResponse = new WalletProviderError(
        error.message || 'Unknown error',
        error.code || 4900,
        error.data
      );
    } else if (error instanceof Error) {
      errorResponse = new WalletProviderError(
        error.message || 'Unknown error',
        4900,
        error
      );
    } else {
      errorResponse = new WalletProviderError('Unknown error', 4900, error);
    }
    return errorResponse;
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
