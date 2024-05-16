import { ProviderError, ProviderErrors } from './ProviderError';
import { SdkStorage, SdkStorageKeys } from './SdkStorage';

/**
 * @summary The Grindery RPC API method names
 */
export enum RpcMethodNames {
  requestPairing = 'requestPairing',
  waitForPairingResult = 'waitForPairingResult',
  request = 'request',
  waitForRequestResult = 'waitForRequestResult',
  'disconnect' = 'disconnect',
}

/**
 * @summary The Grindery RPC API request results
 * @since 0.2.0
 */
export namespace RpcRequestResults {
  /**
   * @summary `waitForPairingResult` method result
   */
  export type waitForPairingResult = {
    session: {
      expiry: number;
      sessionId: string;
      namespaces: {
        [key: string]: {
          accounts: string[];
          chains: string[];
          events: string[];
          methods: string[];
        };
      };
    };
  };

  /**
   * @summary `requestPairing` method result
   */
  export type requestPairing = {
    pairingToken: string;
    connectUrl: string;
    connectUrlBrowser: string;
    shortToken: string;
  };

  /**
   * @summary `request` method result
   */
  export type request = {
    requestToken: string;
  };

  /**
   * @summary `waitForRequestResult` method result
   */
  export type waitForRequestResult = any;

  /**
   * @summary `disconnect` method result
   */
  export type disconnect = boolean;
}

/**
 * @summary The Grindery RPC API wrapper class
 * @since 0.2.0
 */
export class Rpc {
  /**
   * @summary Sends a provider request to the Grindery RPC API and waits for the result.
   * @public
   * @param {RpcMethodNames} method Provider request method name
   * @param {Array} params Provider request parameters
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  public async sendAndWaitRpcRequest<T>(
    method: string,
    params?: readonly unknown[],
    timeout?: number
  ): Promise<T> {
    const request = await this.sendRpcRequest(method, params);
    return await this.waitRpcRequest(request.requestToken, timeout);
  }

  /**
   * @summary Sends a provider request to the Grindery RPC API.
   * @protected
   * @param {RpcMethodNames} method Provider request method name
   * @param {Array} params Provider request parameters
   * @returns {RpcRequestResults.request} Promise resolving with the request token to use in the `waitGrinderyRpcProviderRequest` method
   */
  protected async sendRpcRequest(
    method: string,
    params?: readonly unknown[]
  ): Promise<RpcRequestResults.request> {
    const storage = new SdkStorage();
    return await this.sendRpcApiRequest<RpcRequestResults.request>(
      RpcMethodNames.request,
      {
        sessionId: storage.getValue(SdkStorageKeys.sessionId),
        scope: storage.getValue(SdkStorageKeys.chainId),
        request: {
          method,
          params,
        },
      }
    );
  }

  /**
   * @summary Waits for the result of the provider request.
   * @protected
   * @param {string} requestToken A token to identify provider request. Recieved in the results of `sendGrinderyRpcProviderRequest` method.
   * @param {number} timeout Optional. The time in milliseconds to wait for the request result. Default is 30000.
   * @returns The result of the provider request
   */
  protected async waitRpcRequest<T>(
    requestToken: string,
    timeout?: number
  ): Promise<T> {
    return await this.sendRpcApiRequest<T>(
      RpcMethodNames.waitForRequestResult,
      {
        requestToken,
        timeout,
      }
    );
  }

  /**
   * @summary Sends a request to the Grindery Walletconnect RPC API.
   * @public
   * @param {RpcMethodNames} method Request method name
   * @param {RequestArgumentsParams} params Request parameters
   * @returns {T} The result of the request
   */
  public async sendRpcApiRequest<T>(
    method: RpcMethodNames,
    params?: unknown[] | object
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
          method: `gws_${method}`,
          params: params || [],
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new ProviderError(data.error.message, data.error.code);
      }
      if (!data.result) {
        throw ProviderErrors.NoResult;
      }
      return data.result;
    } catch (error) {
      throw new ProviderError('Server error', 500, error);
    }
  }
}
