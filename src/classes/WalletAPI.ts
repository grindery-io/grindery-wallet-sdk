import { SdkStorage, SdkStorageKeys } from './SdkStorage';

/**
 * @summary The Grindery Wallet API wrapper class
 * @since 0.5.0
 */
export class WalletAPI {
  /**
   * @summary Sends a request to the Grindery Wallet API
   * @public
   * @param {string} method JSON-RPC method name
   * @param {object} params JSON-RPC method parameters, optional
   * @returns {T} The result of the API request
   */
  public async sendApiRequest<T>(method: string, params?: object): Promise<T> {
    const storage = new SdkStorage();
    const sessionId = storage.getValue(SdkStorageKeys.sessionId);
    const address = storage.getValue(SdkStorageKeys.address);
    if (!sessionId || !address) {
      throw new Error('Not connected to the wallet');
    }
    const response = await fetch(`https://wallet-api.grindery.com/v3`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${address}:${sessionId}`,
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method,
        params: params || {},
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to call ${method}`);
    }
    const json = await response.json();
    return json.result as T;
  }
}
