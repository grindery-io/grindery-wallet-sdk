import { SdkStorage, SdkStorageKeys } from './SdkStorage';

/**
 * @summary The Grindery Wallet API wrapper class
 * @since 0.5.0
 */
export class WalletAPI {
  /**
   * @summary Sends a request to the Grindery Wallet API
   * @public
   * @param {string} path API route path
   * @param {string} method Optional. The request method. Default is 'GET'.
   * @param {object} body Optional. The request body.
   * @returns {T} The result of the API request
   */
  public async sendApiRequest<T>(
    path: string,
    method?: string,
    body?: object
  ): Promise<T> {
    const storage = new SdkStorage();
    const sessionId = storage.getValue(SdkStorageKeys.sessionId);
    const address = storage.getValue(SdkStorageKeys.address);
    if (!sessionId || !address) {
      throw new Error('Not connected to the wallet');
    }
    const response = await fetch(
      `https://wallet-api.grindery.com${
        path.startsWith('/') ? path : '/' + path
      }`,
      {
        method: method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${address}:${sessionId}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }

    return (await response.json()) as T;
  }
}
